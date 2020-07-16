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
   * @returns {Object} the setting.
   */
  getSetting (type, id) {
    return this.req.get(`/${type}/${id}`)
  }

  /**
   * Create or update a setting.
   * @param {string} type The type the settings were saved under
   * @param {string} id Their specific id
   * @param {Object} data The data that is to be saved.
   * @returns {Object} the setting.
   */
  createSetting (type, id, data) {
    return this.updateSetting(type, id, data)
  }

  /**
   * Create or update a setting.
   * @param {string} type The type the settings were saved under
   * @param {string} id Their specific id
   * @param {Object} data The data that is to be saved.
   * @returns {Object} the setting.
   */
  updateSetting (type, id, data) {
    return this.req.post(`/${type}/${id}`, data)
  }

  /**
   * Delete an existing setting
   * @param {string} type The type the settings were saved under
   * @param {string} id Their specific id
   */
  deleteSetting (type, id) {
    return this.req.delete(`/${type}/${id}`)
  }

  /**
   * Get all existing subsettings
   * @param {string} type The type the settings were saved under
   * @param {string} id Their specific id
   * @param {string} subtype The name of the subtype
   * @returns {Array<Object>} Array of all existing settings.
   */
  getSubsettings (type, id, subtype) {
    return this.req.get(`/${type}/${id}/${subtype}`)
  }

  /**
   * Get one existing subsetting
   * @param {string} type The type the settings were saved under
   * @param {string} id Their specific id
   * @param {string} subtype The name of the subtype
   * @param {string} subid The subid of the setting
   * @returns {Object} The setting.
   */
  getSubsetting (type, id, subtype, subid) {
    return this.req.get(`/${type}/${id}/${subtype}/${subid}`)
  }

  /**
   * Create or update a subsetting
   * @param {string} type The type the settings were saved under
   * @param {string} id Their specific id
   * @param {string} subtype The name of the subtype
   * @param {string} subid The subid of the setting
   * @param {Object} data The data that is to be saved.
   * @returns {Object} The setting.
   */
  createSubsetting (type, id, subtype, subid, data) {
    return this.updateSubsetting(type, id, subtype, subid, data)
  }

  /**
   * Create or update a subsetting
   * @param {string} type The type the settings were saved under
   * @param {string} id Their specific id
   * @param {string} subtype The name of the subtype
   * @param {string} subid The subid of the setting
   * @param {Object} data The data that is to be saved.
   * @returns {Object} The setting.
   */
  updateSubsetting (type, id, subtype, subid, data) {
    return this.req.post(`/${type}/${id}/${subtype}/${subid}`, data)
  }

  /**
   * Delete an existing subsetting
   * @param {string} type The type the settings were saved under
   * @param {string} id Their specific id
   * @param {string} subtype The name of the subtype
   * @param {string} subid The subid of the setting
   */
  deleteSubsetting (type, id, subtype, subid) {
    return this.req.delete(`/${type}/${id}/${subtype}/${subid}`)
  }
}

module.exports = Tama
