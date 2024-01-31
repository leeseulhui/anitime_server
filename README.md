> Server
- Flask 2.0.0
- python 3.7.2
- AWS EC2 

> Database
- (MySQL,radis)
- Celery

> Machine Learning
- opencv-python
- scikit-learn 
- Pytorch


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

   
