const path = require("path");
const { existsSync, mkdirSync, writeFileSync, readFileSync, unlinkSync } = require("fs");
const { set, get, unset } = require("lodash");

class JsonDatabase {

    constructor({ DatabaseJson = "database/db.json", maxDataSize = null } = {}) {
        if (maxDataSize !== null && typeof maxDataSize !== "number") {
            console.log("The maximum limit must be in number type!");
        }

        if (maxDataSize !== null && maxDataSize < 1) {
            console.log("Inappropriate range for the limit!");
        }

        let basePath = process.cwd();
        if (DatabaseJson.startsWith(basePath)) {
            DatabaseJson = DatabaseJson.replace(basePath, "");
        }

        if (DatabaseJson.startsWith(`.${path.sep}`)) {
            DatabaseJson = DatabaseJson.slice(1);
        }

        if (!DatabaseJson.startsWith(path.sep)) {
            DatabaseJson = path.sep + DatabaseJson;
        }

        if (!DatabaseJson.endsWith(".json")) {
            if (DatabaseJson.endsWith(path.sep)) {
                DatabaseJson += "db.json";
            } else {
                DatabaseJson += ".json";
            }
        }

        basePath = `${basePath}${DatabaseJson}`;

        const dirNames = DatabaseJson.split(path.sep).slice(1);

        const length = dirNames.length;

        if (length > 1) {
            dirNames.pop();

            const firstResolvedDir = path.resolve(dirNames[0]);

            if (!existsSync(firstResolvedDir)) {
                mkdirSync(firstResolvedDir);
            }

            dirNames.splice(0, 1);

            let targetDirPath = firstResolvedDir;

            for (const dirName of dirNames) {
                const currentPath = `${targetDirPath}${path.sep}${dirName}`;

                if (!existsSync(currentPath)) {
                    mkdirSync(currentPath);
                }

                targetDirPath = `${targetDirPath}${path.sep}${dirName}`;
            }
        }

        this.path = basePath;

        if (!existsSync(this.path)) {
            writeFileSync(this.path, "{}");
        }

        this.maxDataSize = maxDataSize;

        this.size = 0;
    }

    set(key, value, autoWrite = true) {
        if (key === "" || typeof key !== "string") {
            console.log("Unapproved key!");
        }

        if (
    
            value === "" ||
            value === undefined ||
            value === null
        ) {
            console.log("Unapproved value!");
        }

        if (typeof autoWrite !== "boolean") {
            console.log("autoWrite parameter must be true or false!");
        }

        if (typeof this.maxDataSize === "number" && this.size >= this.maxDataSize) {
            console.log("Data limit exceeded!");
        }

        const jsonData = this.toJSON();

        set(jsonData, key, value);

        if (autoWrite) writeFileSync(this.path, JSON.stringify(jsonData, null, 4));

        this.size++;

        return value;
    }

    get(key, defaultValue = null) {
        if (key === "" || typeof key !== "string") {
            console.log("Unapproved key!");
        }

        const jsonData = this.toJSON();

        const data = get(jsonData, key);
        return data === undefined ? defaultValue : data;
    }

    fetch(key, defaultValue) {
        return this.get(key, defaultValue);
    }

    exists(key) {
        return this.toJSON().hasOwnProperty(key);
    }

    has(key) {
        return this.exists(key);
    }

    all(limit = 0) {
        if (typeof limit !== "number") {
            console.log("Must be of limit number type!");
        }

        const jsonData = JSON.parse(readFileSync(this.path, "utf-8"));

        const arr = [];
        for (const key in jsonData) {
            arr.push({
                ID: key,
                data: jsonData[key]
            });
        }

        return limit > 0 ? arr.splice(0, limit) : arr;
    }

    fetchAll(limit) {
        return this.all(limit);
    }

    toJSON(limit) {
        const allData = this.all(limit);

        const json = {};
        for (const element of allData) {
            json[element.ID] = element.data;
        }
        return json;
    }

    delete(key, autoWrite = true) {
        if (key === "" || typeof key !== "string") {
            console.log("Unapproved key!");
        }

        if (typeof autoWrite !== "boolean") {
            console.log("autoWrite parameter must be true or false!");
        }

        const jsonData = this.toJSON();

        this.size--;
        unset(jsonData, key);

        if (autoWrite) writeFileSync(this.path, JSON.stringify(jsonData, null, 4));
        return;
    }

    deleteAll() {
        writeFileSync(this.path, "{}");
        this.size = 0;
        return;
    }

    type(key) {
        const data = this.get(key);
        if (Array.isArray(data)) return "array";
        else return typeof data;
    }

    pull(key, callbackfn, multiple = false, thisArg) {
        let data = this.get(key);
        if (!data) return false;
        if (!Array.isArray(data)) console.log(`${key} It is not a data string with an ID.`);
        if (typeof multiple !== "boolean") {
            console.log("multiple parameter must be true or false!");
        }
        if (thisArg) callbackfn = callbackfn.bind(thisArg);

        const length = data.length;

        if (multiple) {
            const newArray = [];

            for (let i = 0; i < length; i++) {
                if (!callbackfn(data[i], i, data)) {
                    newArray.push(data[i]);
                }
            }
            
            return this.set(key, newArray);
        } else {
            const index = data.findIndex(callbackfn);
            data.splice(index, 1);
        }

        return this.set(key, data);
    }

    valueArray() {
        const all = this.all();
        return all.map((element) => element.data);
    }

    keyArray() {
        const all = this.all();
        return all.map((element) => element.ID);
    }

    math(key, operator, value, goToNegative = false) {
        
        if (Array.isArray(value) || isNaN(value)) {
            console.log(`The type of value is not a number.`);
        }

        if (value <= 0) console.log(`Value cannot be less than 1.`);
        value = Number(value);
        if (typeof goToNegative !== "boolean") console.log(`The goToNegative parameter must be of boolean type.`);
        let data = this.get(key);
        if (!data) {
        
            return this.set(key, value);
        }
    
        if (Array.isArray(data) || isNaN(data)) console.log(`${key} ID data is not a number type data.`);

    
        data = Number(data);
        switch (operator) {
            case "+":
            
                data += value;
                break;
            case "-":
                
                data -= value;
                
                if (goToNegative === false && data < 1) data = 0;
                break;
            case "*":
            
                data *= value;
                break;
            case "/":
        
                data /= value;
                break;
            case "%":
                
                data %= value;
                break;
        }
        return this.set(key, data);
    }

    add(key, value) {
        return this.math(key, "+", value);
    }

    substr(key, value, goToNegative) {
        return this.math(key, "-", value, goToNegative);
    }

    push(key, value) {
        const data = this.get(key);
        if (!data) {
            
            return this.set(key, [value]);
        }
        if (Array.isArray(data)) {
            data.push(value);
            return this.set(key, data);
        } else {
        
            return this.set(key, [value]);
        }
    }

    includes(key) {
        return this.filter((element) => element.ID.includes(key));
    }

    startsWith(key) {
        return this.filter((element) => element.ID.startsWith(key));
    }

    filter(callbackfn, thisArg) {
        if (thisArg) callbackfn = callbackfn.bind(thisArg);
        return this.all().filter(callbackfn);
    }

    sort(callbackfn, thisArg) {
        if (thisArg) callbackfn = callbackfn.bind(thisArg);
        return this.all().sort(callbackfn);
    }

    destroy() {
        return unlinkSync(this.path);
    }

    findAndDelete(callbackfn, thisArg) {
        let deletedSize = 0;
        if (thisArg) callbackfn = callbackfn.bind(thisArg);
        const all = this.all();
        for (const element of all) {
            if (callbackfn(element, this)) {
                this.delete(element.ID);
                deletedSize++;
            }
        }
        return deletedSize;
    }

}

module.exports = JsonDatabase;
