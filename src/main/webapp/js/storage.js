/**
 * @file 데이터를 저장하고 조회하는 저장소 객체 함수 모듈 파일
 */
/**
 * key와 value로 데이터를 저장하고 사용하는 함수
 * @module Storage
 */
Storage = (() => {
  /**
   * 데이터를 저장할 Object 변수
   * @type {Object}
   */
  let storage_ = {};
  return {
    /**
     * 데이터를 저장하는 함수
     * @param {string} key - 데이터를 구별 하는 key
     * @param {*} value - 저장할 데이터
     * @module Storage/set
     */
    set(key, value) {
      storage_[key] = value;
    },

    /**
     * 저장된 데이터를 반환하는 함수
     * @param {string} key - 데이터를 구별 하는 key
     * @returns {*} - 저장된 데이터
     * @module Storage/get
     */
    get(key) {
      return storage_[key];
    },

    /**
     * stroage를 초기화 하는 함수
     * @module Storage/reset
     */
    reset() {
      storage_ = {};
    },
  };
})();
