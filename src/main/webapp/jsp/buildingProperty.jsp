<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<script src="/js/libs/json-hierarchical-tree-picker/jquery.simple-tree-picker.js"></script>
<div>
   <div class="">
       <label class="col-sm-12 control-label form-label">검색지역</label>
       <div class="col-sm-4">
           <select class="form-basic" name="sido" oncChange="getSiGunGu(this.value)">
               <option selected disabled hidden>광역시도</option>
               <option value="01">전라북도</option>
           </select>
       </div>
       <select id="si">
           <option  value="00">시도</option>
           <option value="01">전라북도</option>
       </select>
       <select id="sgg">
       <option value="00">시군구</option>
       <option value="01">전주시</option>
       </select>
       <select id="emd">
           <option value="00">읍면동</option>
           <option value="01">전주시</option>
       </select>
   </div>

    <div>
        <label>ROI</label>
        <div>
            <div>
                ULX
            </div>
            <div>
                <input type="number" id="roi_min_x">
            </div>
            <div>
                ULY
            </div>
            <div>
                <input type="number" id="roi_max_y">
            </div>
            <div>
                LRX
            </div>
            <div>
                <input type="number" id="roi_max_x">
            </div>
            <div>
                LRY
            </div>
            <div>
                <input type="number" id="roi_min_y">
            </div>
        </div>
        <div class="btn-wrap a-cent">
            <a href="javascript:CMSC003.GIS.startSelectingROI()"
                class="btn btn-info" style="width: 160px;">
                <i class="fas fa-mouse-pointer m-r-5"></i>사용자 정의 ROI
            </a>
        </div>
        <div class="form-group"
             style="margin-top: 3px; margin-left: 5px; padding-right: 10px;">
            <span class="col-sm-4 control-label form-label"
                  style="padding-left: 10px; border: 1px solid #e1e1e1; margin-top: 1px; background-color: #e1e1e1;">ROI 반경(m)</span>
            <div class="col-sm-8">
                <input type="number" class="form-control" id="roiRadius">
            </div>
        </div>
        <a href="javascript:search()" style="width: 294px;"
           class="btn btn-default"><i class="fas fa-search m-r-5"></i>검색
        </a>
    </div>
    <div class="sidepanel-s-title"
         style="margin-top: 8px; padding-bottom: 8px;">검색 결과</div>
    <div class="col-lg-12 js-search-result-area">
    </div>
    <script type="text/javascript">
        $(document).ready(function () {

        });
        function search() {
            var demoBuildingInfoDataJson = {
                "건물정보":[{"건물명" : "건물명1",
                    "층수" : 10},
                    {"건물명" : "건물명2",
                        "층수" : 9},
                    {"건물명" : "건물명3",
                        "층수" : 11}]
            }
            $(".col-lg-12").simpleTreePicker({
                "tree": demoBuildingInfoDataJson,
                "onclick": function () {
                    var selected = $(".col-lg-12").simpleTreePicker("display");
                    console.log(selected);
                },
            });
        }
    </script>

</div>