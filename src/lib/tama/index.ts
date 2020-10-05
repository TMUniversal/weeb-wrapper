'use strict'

import RequestHandler from '../RequestHandler'
import * as CommonTypes from '../CommonTypes'

class Tama implements CommonTypes.IApiHandler {
  req: RequestHandler
  constructor (baseUrl: CommonTypes.APIUrl, token: CommonTypes.APIKey) {
    this.req = new RequestHandler(baseUrl, token)
  }

  /**
   * Get an existing setting
   * @param {String} type The type the settings were saved under
   * @param {String} id Their specific id
   * @returns {Promise<Object>} the setting.
   */
  public async getSetting (
    type: string,
    id: string
  ): Promise<SettingData | CommonTypes.APIResponse> {
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
  public createSetting = this.updateSetting

  /**
   * Create or update a setting.
   * @param {String} type The type the settings were saved under
   * @param {String} id Their specific id
   * @param {Object} data The data that is to be saved.
   * @returns {Promise<Object>} the setting.
   */
  public async updateSetting (
    type: string,
    id: string,
    data: Object
  ): Promise<SettingData | CommonTypes.APIResponse> {
    if (typeof data !== 'object') {
      return Promise.reject(
        new Error('Data provided in incorrect format. Provide an Object.')
      )
    }
    try {
      const res = await this.req.post(`/${type}/${id}`, data)
      if (!res) return Promise.reject(new Error('Request failed.'))
      return Promise.resolve(res.data.setting.data)
    } catch (err) {
      return Promise.reject(err.response?.data || err || new Error())
    }
  }

  /**
   * Delete an existing setting
   * @param {String} type The type the settings were saved under
   * @param {String} id Their specific id
   * @returns {Promise<Object>} The setting
   */
  public async deleteSetting (
    type: string,
    id: string
  ): Promise<SettingData | CommonTypes.APIResponse> {
    try {
      const res = await this.req.delete(`/${type}/${id}`)
      if (!res) return Promise.reject(new Error('Request failed.'))
      return Promise.resolve(res.data.setting.data)
    } catch (err) {
      return Promise.reject(err.response?.data || err || new Error())
    }
  }

  /**
   * Get all existing subsettings
   * @param {String} type The type the settings were saved under
   * @param {String} id Their specific id
   * @param {String} subtype The name of the subtype
   * @returns {Promise<Object>} Array of all existing settings.
   */
  public async getSubsettings (
    type: string,
    id: string,
    subtype: string
  ): Promise<SubSettingsData | CommonTypes.APIResponse> {
    try {
      const res = await this.req.get(`/${type}/${id}/${subtype}`)
      if (!res) return Promise.reject(new Error('Request failed.'))
      const response: SubSettingsData = {}
      res.subsettings.forEach((subsetting: SubSetting) => {
        if (subsetting.data === undefined || subsetting.data == null) return
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
  public async getSubsetting (
    type: string,
    id: string,
    subtype: string,
    subid: string
  ): Promise<SubSettingData | CommonTypes.APIResponse> {
    if (subid === undefined || subid == null) {
      return Promise.reject(new Error('No subId provided.'))
    }
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
  public createSubsetting = this.updateSubsetting

  /**
   * Create or update a subsetting
   * @param {String} type The type the settings were saved under
   * @param {String} id Their specific id
   * @param {String} subtype The name of the subtype
   * @param {String} subid The subid of the setting
   * @param {Object} data The data that is to be saved.
   * @returns {Promise<Object>} the setting.
   */
  public async updateSubsetting (
    type: string,
    id: string,
    subtype: string,
    subid: string,
    data: object
  ): Promise<SubSettingData | CommonTypes.APIResponse> {
    try {
      const res = await this.req.post(
        `/${type}/${id}/${subtype}/${subid}`,
        data
      )
      if (!res) return Promise.reject(new Error('Request failed.'))
      return Promise.resolve(res.data.subsetting.data)
    } catch (err) {
      return Promise.reject(err.response?.data || err || new Error())
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
  public async deleteSubsetting (
    type: string,
    id: string,
    subtype: string,
    subid: string
  ): Promise<SubSettingData | CommonTypes.APIResponse> {
    try {
      const res = await this.req.delete(`/${type}/${id}/${subtype}/${subid}`)
      if (!res) return Promise.reject(new Error('Request failed.'))
      return Promise.resolve(res.data.subsetting.data)
    } catch (err) {
      return Promise.reject(err.response?.data || err || new Error())
    }
  }
}

export default Tama

interface Setting {
  id: string
  type: string
  accountId: string
  data?: SettingData
}

interface SubSetting extends Setting {
  subType: string
  subId: string
}

interface SettingData extends Object {
  [key: string]: string | number | Array<any> | Object | undefined
}

interface SubSettingData extends SettingData {}

interface SubSettingsData {
  [subId: string]: SubSettingData
}
