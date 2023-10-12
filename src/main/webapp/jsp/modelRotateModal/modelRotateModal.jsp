<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<style>
    #model-rotate-modal {
        display: none;
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 350px;
        height: 230px;
        z-index: 3030;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        box-sizing: border-box;
        padding: 15px
    }

    #model-rotate-title,
    #model-rotate-content,
    #model-rotate-footer {
        height: 33.33%;
    }

    #model-rotate-title {
        font-size: 20px;
        font-weight: bold;
        color: white;
        text-align: center;
    }

    #model-rotate-content {
        font-size: 15px;
        color: white;
        text-align: center;
    }

    #model-rotate-footer {
        display: none;
        font-size: 15px;
        color: white;
        text-align: center;
        padding: 40px
    }
</style>

<script>
	document.addEventListener("DOMContentLoaded", function () {
		const modelClosenessData = [461.49297095574445, 332.1309522125708, 199.3679065185259, 185.57968155973555, 123.09585257082607, 59.58904585006059, 31.24583812847083, 7.85130191128515]
        let headingValue = 228;
        let rotateCount = 0;
		let angleValue = 0;
        let index = 0;

        const angleElement = document.querySelector("#model-rotate-angle > div:last-child");
        const modelClosenessElement = document.querySelector("#model-rotate-closeness > div:last-child");

		document.getElementById('rotate_model_button').addEventListener('click', function() {
            let intervalId = setInterval(() => {
                headingValue += 18.75;
                if (headingValue >= 360) {
                    headingValue -= 360;
                }

                const siheung_rotate_model_matrix = new Ditap.Transforms.headingPitchRollToFixedFrame(
                    new Ditap.Cartesian3.fromDegrees(
                        127.058968,
                        35.835169,
                        34.97499999999889
                    ),
                    new Ditap.HeadingPitchRoll(Ditap.Math.toRadians(headingValue), 0, 0),
                    Ditap.Ellipsoid.WGS84,
                    Ditap.Transforms.localFrameToFixedFrameGenerator("south", "east")
                );
                rotateCount++;

                if (rotateCount >= 8) {
                    clearInterval(intervalId);
                }
                siheung_wrong_model.modelMatrix = siheung_rotate_model_matrix;
            }, 1000);

            let updateIntervalId = setInterval(() => {
                    angleValue += 18.75;
                    if (angleValue > 150) {
                        angleValue = 150;
                        clearInterval(updateIntervalId);
                    }
                    angleElement.textContent = angleValue;

                    if (index < modelClosenessData.length) {
                        modelClosenessElement.textContent = modelClosenessData[index];
                        index++;
                    } else {
                        clearInterval(updateIntervalId);
                    }
                }, 1000);

            setTimeout(() => {
                clearInterval(intervalId);
                document.getElementById('model-rotate-footer').style.display = "block";
            }, 9000);

            document.getElementById('model-rotate-modal').style.display = "block";

            setTimeout(() => {
                document.getElementById('model-rotate-modal').style.display = "none";
            }, 13000);
        });
	})

</script>

<div id="model-rotate-modal">
	<div id="model-rotate-title">
		GeoReferencing 정보
	</div>
	<div id="model-rotate-content">
		<div id="model-rotate-angle">
			<div>Angle(회전각도)</div>
			<div></div>
		</div>
		<div id="model-rotate-closeness" style="margin-top: 10px">
			<div>ModelCloseness(모델유사도)</div>
            <div></div>
		</div>
	</div>
	<div id="model-rotate-footer" style="font-size: 15px; font-weight: bold">
		폴리곤 매칭이 완료되었습니다.
	</div>
</div>
