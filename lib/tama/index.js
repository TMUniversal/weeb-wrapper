'use strict'

const RequestHandler = require('../RequestHandler')

class Tama {
  constructor (baseUrl, token) {
    this.req = new RequestHandler(baseUrl, token)
  }

  /**
   * Get an existing setting
   * @param {String} type The type the settings were saved under
   * @param {String} id Their specific id
   * @returns {Promise<Object>} the setting.
   */
  async getSetting (type, id) {
    try {
      const res = await this.req.get(`/${type}/${id}`)
      if (!res) return Promise.reject(new Error('Request failed.'))
      return Promise.resolve(res.setting.data)
    } catch (err) {
      return Promise.reject(err || new Error())
    }
  }

  /**
   * Create or update a setting.
   * @param {String} type The type the settings were saved under
   * @param {String} id Their specific id
   * @param {Object} data The data that is to be saved.
   * @returns {Promise<Object>} the setting.
   */
  async createSetting (type, id, data) {
    return this.updateSetting(type, id, data)
  }

  /**
   * Create or update a setting.
   * @param {String} type The type the settings were saved under
   * @param {String} id Their specific id
   * @param {Object} data The data that is to be saved.
   * @returns {Promise<Object>} the setting.
   */
  async updateSetting (type, id, data) {
    if (typeof data !== 'object') return Promise.reject(new Error('Data provided in incorrect format. Provide an Object.'))
    try {
      const res = await this.req.post(`/${type}/${id}`, data)
      if (!res) return Promise.reject(new Error('Request failed.'))
      return Promise.resolve(res.data.setting.data)
    } catch (err) {
      return Promise.reject(err.response.data || new Error())
    }
  }

  /**
   * Delete an existing setting
   * @param {String} type The type the settings were saved under
   * @param {String} id Their specific id
   * @returns {Promise<Object>} The setting
   */
  async deleteSetting (type, id) {
    try {
      const res = await this.req.delete(`/${type}/${id}`)
      if (!res) return Promise.reject(new Error('Request failed.'))
      return Promise.resolve(res.data.setting.data)
    } catch (err) {
      return Promise.reject(err.response.data || new Error())
    }
  }

  /**
   * Get all existing subsettings
   * @param {String} type The type the settings were saved under
   * @param {String} id Their specific id
   * @param {String} subtype The name of the subtype
   * @returns {Promise<Object>} Array of all existing settings.
   */
  async getSubsettings (type, id, subtype) {
    try {
      const res = await this.req.get(`/${type}/${id}/${subtype}`)
      if (!res) return Promise.reject(new Error('Request failed.'))
      const response = {}
      res.subsettings.forEach(subsetting => {
        response[subsetting.subId] = subsetting.data
      })
      return Promise.resolve(response)
    } catch (err) {
      return Promise.reject(err || new Error())
    }
  }

  /**
   * Get one existing subsetting
   * @param {String} type The type the settings were saved under
   * @param {String} id Their specific id
   * @param {String} subtype The name of the subtype
   * @param {String} subid The subid of the setting
   * @returns {Promise<Object>} the setting.
   */
  async getSubsetting (type, id, subtype, subid) {
    if (subid === undefined || subid == null) return Promise.reject(new Error('No subId provided.'))
    try {
      const res = await this.req.get(`/${type}/${id}/${subtype}/${subid}`)
      if (!res) return Promise.reject(new Error('Request failed.'))
      return Promise.resolve(res.subsetting.data)
    } catch (err) {
      return Promise.reject(err || new Error())
    }
  }

  /**
   * Create or update a subsetting
   * @param {String} type The type the settings were saved under
   * @param {String} id Their specific id
   * @param {String} subtype The name of the subtype
   * @param {String} subid The subid of the setting
   * @param {Object} data The data that is to be saved.
   * @returns {Promise<Object>} the setting.
   */
  async createSubsetting (type, id, subtype, subid, data) {
    return this.updateSubsetting(type, id, subtype, subid, data)
  }

  /**
   * Create or update a subsetting
   * @param {String} type The type the settings were saved under
   * @param {String} id Their specific id
   * @param {String} subtype The name of the subtype
   * @param {String} subid The subid of the setting
   * @param {Object} data The data that is to be saved.
   * @returns {Promise<Object>} the setting.
   */
  async updateSubsetting (type, id, subtype, subid, data) {
    try {
      const res = await this.req.post(`/${type}/${id}/${subtype}/${subid}`, data)
      if (!res) return Promise.reject(new Error('Request failed.'))
      return Promise.resolve(res.data.subsetting.data)
    } catch (err) {
      return Promise.reject(err.response.data || new Error())
    }
  }

  /**
   * Delete an existing subsetting
   * @param {String} type The type the settings were saved under
   * @param {String} id Their specific id
   * @param {String} subtype The name of the subtype
   * @param {String} subid The subid of the setting
   * @returns {Promise<Object>} The setting
   */
  async deleteSubsetting (type, id, subtype, subid) {
    try {
      const res = await this.req.delete(`/${type}/${id}/${subtype}/${subid}`)
      if (!res) return Promise.reject(new Error('Request failed.'))
      return Promise.resolve(res.data.subsetting.data)
    } catch (err) {
      return Promise.reject(err.response.data || new Error())
    }
  }
}

module.exports = Tama
