'use strict'

const RequestHandler = require('../RequestHandler')

class Tama {
  constructor (baseUrl, token) {
    this.req = new RequestHandler(baseUrl, token)
  }

  /**
   * Get an existing setting
   * @param {string} type The type the settings were saved under
   * @param {string} id Their specific id
   * @returns {Promise<Object>} the setting.
   */
  async getSetting (type, id) {
    return (await this.req.get(`/${type}/${id}`)).setting.data
  }

  /**
   * Create or update a setting.
   * @param {string} type The type the settings were saved under
   * @param {string} id Their specific id
   * @param {Object} data The data that is to be saved.
   * @returns {Promise<Object>} the setting.
   */
  async createSetting (type, id, data) {
    return this.updateSetting(type, id, data)
  }

  /**
   * Create or update a setting.
   * @param {string} type The type the settings were saved under
   * @param {string} id Their specific id
   * @param {Object} data The data that is to be saved.
   * @returns {Promise<Object>} the setting.
   */
  async updateSetting (type, id, data) {
    return (await this.req.post(`/${type}/${id}`, data)).data.setting.data
  }

  /**
   * Delete an existing setting
   * @param {string} type The type the settings were saved under
   * @param {string} id Their specific id
   * @returns {Promise<Object>} The setting
   */
  async deleteSetting (type, id) {
    return (await this.req.delete(`/${type}/${id}`)).data.setting.data
  }

  /**
   * Get all existing subsettings
   * @param {string} type The type the settings were saved under
   * @param {string} id Their specific id
   * @param {string} subtype The name of the subtype
   * @returns {Promise<Array<Object>>} Array of all existing settings.
   */
  async getSubsettings (type, id, subtype) {
    const subsettings = (await this.req.get(`/${type}/${id}/${subtype}`)).subsettings
    if (!subsettings) return []
    const response = {}
    subsettings.forEach(subsetting => {
      response[subsetting.subId] = subsetting.data
    })
    return response
  }

  /**
   * Get one existing subsetting
   * @param {string} type The type the settings were saved under
   * @param {string} id Their specific id
   * @param {string} subtype The name of the subtype
   * @param {string} subid The subid of the setting
   * @returns {Promise<Object>} the setting.
   */
  async getSubsetting (type, id, subtype, subid) {
    return (await this.req.get(`/${type}/${id}/${subtype}/${subid}`)).subsetting.data
  }

  /**
   * Create or update a subsetting
   * @param {string} type The type the settings were saved under
   * @param {string} id Their specific id
   * @param {string} subtype The name of the subtype
   * @param {string} subid The subid of the setting
   * @param {Object} data The data that is to be saved.
   * @returns {Promise<Object>} the setting.
   */
  async createSubsetting (type, id, subtype, subid, data) {
    return this.updateSubsetting(type, id, subtype, subid, data)
  }

  /**
   * Create or update a subsetting
   * @param {string} type The type the settings were saved under
   * @param {string} id Their specific id
   * @param {string} subtype The name of the subtype
   * @param {string} subid The subid of the setting
   * @param {Object} data The data that is to be saved.
   * @returns {Promise<Object>} the setting.
   */
  async updateSubsetting (type, id, subtype, subid, data) {
    return (await this.req.post(`/${type}/${id}/${subtype}/${subid}`, data)).data.subsetting.data
  }

  /**
   * Delete an existing subsetting
   * @param {string} type The type the settings were saved under
   * @param {string} id Their specific id
   * @param {string} subtype The name of the subtype
   * @param {string} subid The subid of the setting
   * @returns {Promise<Object>} The setting
   */
  async deleteSubsetting (type, id, subtype, subid) {
    return (await this.req.delete(`/${type}/${id}/${subtype}/${subid}`)).data.subsetting
  }
}

module.exports = Tama
