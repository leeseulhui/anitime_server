[Back end]
> Server
- Flask 2.0.0
- python 3.7.2
- AWS EC2 

> Database
- (MySQL,radis)
- Celery

[Machine Learning]
- opencv-python
- scikit-learn 
- Pytorch

[Back end]
1) Backend 구현 로직 - 등록
  Client에서 비문사진 전송 -> 서버에서 preprocess 과정-> 전달받은 사진들을 통해 이미 등록된 강아지인지 classification 실행 -> (미등록 강아지일 경우) database에 사용자 및 강아지정보 등록 & client에 "등록 성공" message 전달 or (등록된 강아지일경우) client에 "이미 등록된 강아지" message 전달

  Frontend로 부터 받은 5장의 사진을 EC2 서버에 저장한 후에 classification을 실행하는 로직은 결과값이 Database에 저장되어 있지 않기 때문에 예외가 발생. 
  따라서 조회를 위한 사진은 따로 미리 저장해놓는 방식을 택했음.

2) Backend 구현 로직 - 조회
   조회가 성공한 경우 uniqueue number 반환
   
   * uniqueue number는 "등록된 서버시간 + 등록된 강아지 이름 초성 + 사용자 핸드폰 번호 뒷자리" 로 만들어져 중복되지 않음.

4) Backend 구현 로직 - 동시성 프로그래밍&비동기 작업
   Flask는 프로세스를 동기적으로 처리하기 때문에 사용자 요청에 무거운 연산(머신러닝)이 포함되어 있는 경우 웹 서버의 처리가 모두 끝날 때까지 기다려야 함.
   등록, 조회 API가 동시 호출 되는 경우를 처리하기 위해 비동기 작업 큐 라이브러리인 celery 사용



[Machine Learning]
1) 강아지 코를 찾기 위한 객체 탐지 모델 : YOLOv5
  객체 탐지 분야에서 유명한 YOLO(You Only Look Once)중 YOLOv5 모델을 사용하여 강아지 코 탐지 모델을 구현.

<img width="396" alt="스크린샷 2024-01-31 오후 1 06 53" src="https://github.com/leeseulhui/anitime_server/assets/75656859/92736e31-b068-40a5-8191-c59aa1491f67">

   
2) 이미지 전처리 : CLAHE
   강아지 코를 촬영할 때 주름이 잘 보이지 않는 경우를 대비하여 주름 무늬가 잘 보이도록 어두운 부분을 밝게 펴주는 전처리가 필요함.
   CLAHE는 히스토그램 높이에 제한을 둬서 특정 높이 이상에 있는 pixel값들을 재분배하는 이미지 평탄화 방식임.

   CLAHE 적용 전
  <img width="378" alt="스크린샷 2024-01-31 오후 1 08 33" src="https://github.com/leeseulhui/anitime_server/assets/75656859/3f9d8146-9d1b-48f4-af7d-ad8a23410003">

  CLAHE 적용 후
  <img width="380" alt="스크린샷 2024-01-31 오후 1 08 58" src="https://github.com/leeseulhui/anitime_server/assets/75656859/eee0c11d-dbc1-4608-8b7c-61ee6126f5f3">

3) 특징 추출 및 벡터화 : SIFT, K-Means
   사용자에게 100장 이상의 강아지 사진을 요구할 수 없기 때문에 입력의 차원을 줄여주는 전처리 과정 필요.
   ** 과정
   - 평탄화 한 이미지에서 특징 추출 (특징 추출 알고리즘으로 SIFT 사용)
   - 추출한 특징을 100차원 벡터로 변환하여 분류 (벡터화 알고리즘 : K-means Bag of Words 기법 구현)
  
4) 이미지 분류 모델 - Scikit learn의 SVM
   100차원의 벡터로 변환된 이미지를 SVM 모델을 이용하여 분류
   
   
