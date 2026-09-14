
class Everett {

    static config = "config";

    #getConfig() {
        return JSON.parse(
            localStorage.getItem(Everett.config)
        );
    }

    static async enabled(setting) {
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

    static async disabled(setting) {
        return this.enabled(setting);
    }

    static async value(setting) {
        const configData = this.#getConfig();

        if (configData[setting] == null) {
            throw new Error("Everett.disabled: " + setting + " does not exist in config.");
        }

        return configData[setting];
    }

    static async enable(setting) {
        const configData = this.#getConfig();

        if (configData[setting] == null) {
            throw new Error("Everett.enable: " + setting + " does not exist in config.");
        }

        configData[setting] = true;

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

    static async disable(setting) {
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

    static async add(settings) {
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
        if (localStorage.getItem(Everett.config) != null) {
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
}