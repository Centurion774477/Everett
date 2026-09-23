
class Everett {

    static config = "config";

    #getConfig() {
        return JSON.parse(
            sessionStorage.getItem(Everett.config)
        );
    }

    // returns true if the given setting is enabled
    static enabled(setting) {
        const configData = this.#getConfig();

        if (configData[setting] == null) {
            throw new Error("Everett.enabled: " + setting + " does not exist in config.");
        }

        return configData[setting] === true;
    }

    // returns true if the given setting is disabled
    static disabled(setting) {
        const configData = this.#getConfig();

        if (configData[setting] == null) {
            throw new Error("Everett.enabled: " + setting + " does not exist in config.");
        }

        return configData[setting] === false;
    }

    // returns the value of the given setting
    static value(setting) {
        const configData = this.#getConfig();

        if (configData[setting] == null) {
            throw new Error("Everett.disabled: " + setting + " does not exist in config.");
        }

        return configData[setting];
    }

    // sets the given setting to true
    static enable(setting) {
        const configData = this.#getConfig();

        if (configData[setting] == null) {
            throw new Error("Everett.enable: " + setting + " does not exist in config.");
        }

        configData[setting] = true;

        try {
            sessionStorage.setItem(Everett.config, JSON.stringify(configData));
        } catch (error) {
            if (error.name === "QuotaExceededError") {
                throw new Error(
                    "Everett.enable: storage quota exceeded; you have exhausted sessionStorage's size limit."
                );
            }
        }
        return true;
    }

    // sets the given setting to false
    static disable(setting) {
        const configData = this.#getConfig();

        if (configData[setting] == null) {
            throw new Error("Everett.enable: " + setting + " does not exist in config.");
        }

        configData[setting] = false;

        try {
            localStorage.setItem(Everett.config, JSON.stringify(configData));
        } catch (error) {
            if (error.name === "QuotaExceededError") {
                throw new Error(
                    "Everett.enable: storage quota exceeded; you have exhausted sessionStorage's size limit."
                );
            }
        }

        return true;
    }

    // adds the given settings to the config file
    static add(settings) {
        const config = this.#getConfig();

        const updated = {...config, ...settings};

        try {
            sessionStorage.setItem('config', JSON.stringify(updated));
        } catch (error) {
            if (error.name === "QuotaExceededError") {
                throw new Error(
                    "Everett.enable: storage quota exceeded; you have exhausted sessionStorage's size limit."
                );
            }
        }

        return true;
    }

    // creates the config file
    static initiate() {
        // if already initiated
        if (sessionStorage.getItem(Everett.config) != null) {
            return;
        }

        try {
            sessionStorage.setItem(Everett.config, JSON.stringify({}));
        } catch (error) {
            if (error.name === "QuotaExceededError") {
                throw new Error(
                    "Everett.enable: storage quota exceeded; you have exhausted sessionStorage's size limit."
                );
            }
        }

        return true;
    }

    // adds the given value to the config file under the given key
    static cache(key, value) {
        if (sessionStorage.getItem(key) != null) {
            return null;
        }

        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            if (error.name === "QuotaExceededError") {
                throw new Error(
                    "Everett.cache: storage quota exceeded; " +
                    "you have exhausted sessionStorage's size limit." +
                    "Everett could not cache " + key + "."
                );
            }
        }
        return true;
    }
}