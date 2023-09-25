<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>


<div class="upload_modal_content">
    <div style="display: flex; justify-content: space-between">
        <div style="margin:10px; color: white">
            <div style="font-size: 20px; font-weight: bold">IFC 업로드</div>
            <div style="font-size: 12px; color:#a5a5a5; margin-top: 5px">파일의 변환(IFC -> GLB)과 속성정보 데이터를 추출합니다.</div>
        </div>
        <div id="upload_modal_close" class="upload_modal_close" onclick="closeUploadModal()">
            <img src="${pageContext.request.contextPath}/public/img/close.png" alt="upload_modal_close"
                style="margin-left:10px; margin-top:10px; width: auto; height: 20px">
        </div>
    </div>
    <div style="display: flex; justify-content: space-between">
        <input type="file" id="file_input" style="flex-grow: 9;">
        <p id="file_name" class="file_input_div" style="flex-grow:9">선택된 IFC 파일이 없습니다.</p>
        <label id="upload_file_input" for="file_input">파일 선택</label>
    </div>
    <div style="display:flex; justify-content: flex-end">
        <button id="upload_button" onclick="fileUpload()">업로드</button>
    </div>
</div>