export const SETUP = "SETUP";
export const CLOSE = "CLOSE";
export const SET_CONFIG = "SET_CONFIG";
export const DOWNLOAD_DOCUMENT = "DOWNLOAD_DOCUMENT";
export const UPLOAD_DOCUMENT = "UPLOAD_DOCUMENT";
export const ADD_DOCUMENT = "ADD_DOCUMENT";
export const GET_DOCUMENT = "GET_DOCUMENT";
export const DELETE_DOCUMENT = "DELETE_DOCUMENT";
export const GET_ALL_DOCUMENTS = "GET_ALL_DOCUMENTS";
export const SHOW_NOTIFICATIONS = "SHOW_NOTIFICATIONS";
export const DISPLAY_MSG = "DISPLAY_MSG";
export const RESET_DOCSMANAGER_STATE = "RESET_DOCSMANAGER_STATE";
export const SHOW_DOCUMENT = "SHOW_DOCUMENT";

/**
 *
 * @param {string} level
 * @param {string} title
 * @param {string} message
 * @returns
 */
export const displayMsg = (level, title, message) => ({
    type: DISPLAY_MSG,
    level,
    title,
    message,
});

/**
 * setup
 * @returns {}
 */
export const setup = (cfg) => ({
    type: SETUP,
    cfg,
});

export const close = (cfg) => ({
    type: CLOSE,
    cfg,
});

/**
 * resetD2tState
 * @returns {}
 */
export const resetDocsManagerState = () => ({
    type: RESET_DOCSMANAGER_STATE,
});

/**
 * Upload a document
 * @param {object} document
 * @returns {{document: object}}
 */
export const uploadDocument = (document) => ({
    type: UPLOAD_DOCUMENT,
    document,
});

/**
 * Download a document
 * @param {string} id
 * @returns {{id: string}}
 */
export const downloadDocument = (id) => ({
    type: DOWNLOAD_DOCUMENT,
    id,
});

/**
 * Show a document in other browser tab
 * @param {string} id
 * @returns {{id:string}}
 */
export const showDocument = (id) => ({
    type: SHOW_DOCUMENT,
    id,
});

/**
 * Get list of documents
 * @param {string} id
 * @returns {{id:string}}
 */
export const getDocument = (id) => ({
    type: GET_DOCUMENT,
    id,
});

/**
 * Get list of documents
 * @param {string} id
 * @returns {{id:string}}
 */
export const getAllDocuments = () => ({
    type: GET_ALL_DOCUMENTS,
});

/**
 * Delete a document by id
 * @param {string} id
 * @returns {{id: string}}
 */
export const deleteDocument = (id) => ({
    type: DELETE_DOCUMENT,
    id,
});
