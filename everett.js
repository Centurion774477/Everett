
class Everett {

    static config = "config";

    #getConfig() {
        return JSON.parse(
            sessionStorage.getItem(Everett.config)
        );
    }

    static enabled(setting) {
        const configData = this.#getConfig();

        if (configData[setting] == null) {
            throw new Error("Everett.enabled: " + setting + " does not exist in config.");
        }

        if (configData[setting] === true) {
            return true;
        } else {
            return false;
        }
    }

    static disabled(setting) {
        return this.enabled(setting);
    }

    static value(setting) {
        const configData = this.#getConfig();

        if (configData[setting] == null) {
            throw new Error("Everett.disabled: " + setting + " does not exist in config.");
        }

        return configData[setting];
    }

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

    static initiate() {
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

    static cache(key, value, stringifyData = false) {
        if (sessionStorage.getItem(key) != null) {
            return null;
        }

        if (stringifyData === true) {
            value = JSON.stringify(value);
        }

        try {
            sessionStorage.setItem(key, value);
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