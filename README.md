# Project Hail Mary : Outline 🌌

---

## 🌠 당신만의 우주를 만들어보세요

<aside>
👾

**Project Hail Mary**는 각 사용자가 자신만의 작은 우주를 꾸밀 수 있도록 설계된 3D 웹페이지입니다.
이곳에서 **소원**과 **목표**를 우주의 별과 행성🪐처럼 띄우고, 그 목표를 이루는 순간 별똥별이 떨어지며 당신을 축하합니다. 🎉

별똥별을 기다리기만 하는 것이 아니라, 이제는 ***스스로 목표를 이루어 별똥별을 만들어 내는 주인공***이 되어 보세요.

</aside>

## Team 👽

---

[김다연](https://www.notion.so/fe3912cd997140ad885e5c31b11124b3?pvs=21) **(한양대 정보시스템학과 22, FE)**
![다연](https://github.com/user-attachments/assets/cd1bcfae-1cef-45e4-8ca0-78b784fe40db)



[kingdayeon - Overview](https://github.com/kingdayeon)

[박준호](https://www.notion.so/abd6a3ef013e45038b1fafa5f2ca111c?pvs=21) **(카이스트 전산학과 21, BE)**
![준호](https://github.com/user-attachments/assets/1fd8dfe3-3585-4737-aad3-d82d059bc3df)



[gs18050 - Overview](https://github.com/gs18050)

## 개발 환경 🖥️

---

![image (2)](https://github.com/user-attachments/assets/e0e551e6-08a3-4e64-b126-0d46af39a636)


- **협업툴 :** Github
- **FE :** React + TypeScript
- **BE :** Node.js + Express
- **DB :** MongoDB Atlas
- **Server:** AWS EC2
- **IDE :** VSCode
- **디자인 :** Figma
- **사용 api :** Open AI api, NASA APOD api, GCP(Google Cloud Platform)

## API 명세서 📑

---

**Base URL**: 

**포트**: 3000

| Category | Method | URL | Reosponses | **설명** |
| --- | --- | --- | --- | --- |
| **사용자 관리** 👩‍👧 | GET | /auth/callback | 400, 500 | Redirection URI 처리 |
|  | POST | /api/users/auth/google | 200, 400, 500 | Google 로그인 DB 전달 |
|  | GET | /api/users/me | 200, 400, 404, 500 | 현재 사용자 정보 조회 |
|  | POST | /api/users/me/sendRequest | 200, 400, 404, 500 | 친구 요청 전송 |
|  | POST | /api/users/me/addFriend | 200, 400, 404, 500 | 친구 요청 수락 |
|  | POST | /api/users/me/deleteFriend | 200, 400, 404, 500 | 친구 추방(삭제) |
|  | POST | /api/users/me/refuse | 200, 400, 404, 500 | 친구 요청 거절 |
|  | GET | /api/users/me/friends | 200, 500 | 친구 목록 조회 |
|  | GET | /api/users/me/requests | 200, 500 | 친구 요청 조회 |
| **버킷리스트 관리** 💫 **** | POST | /api/buckets | 201, 400, 500 | 새 버킷리스트 생성 |
|  | GET | /api/buckets | 200, 500 | 버킷리스트 조회 |
|  | PATCH | /api/buckets/:id/complete | 200, 404, 500 | 버킷리스트 달성 처리 |
|  | DELETE | /api/buckets/:id/delete | 200, 404, 500 | 버킷리스트 삭제 |
|  | GET | /api/buckets/friend | 200, 400, 403, 404, 500 | 친구 버킷리스트 조회 |
| **별자리/운세 관리** ⭐ | GET | /api/horoscopes | 200, 500 | 별자리 정보 조회 |
|  | GET | /api/horoscopes/:sign | 200, 404, 500 | 오늘의 운세 조회 |
| **NASA api 관리** 🚀 | GET | /api/apod/random | 500 | NASA api 이미지 관리 |

## DB 💽

---

**DB 구조**
![image (3)](https://github.com/user-attachments/assets/c6633e77-a299-4c17-b3ab-ab7c5b83be31)



**타입 정의**
![image (4)](https://github.com/user-attachments/assets/9b8d0ce0-645c-4bca-ad5d-b7c9260329ac)



## Landing 🌌
![image (5)](https://github.com/user-attachments/assets/4bdc4681-a90e-4e0a-b2fd-a7255147c6e3)

---


<aside>
👾

랜딩페이지에서는 매일 다른 우주 관련 이미지를 보여줍니다. 사진을 클릭하면 구글 로그인 창으로 이동하게 됩니다. 

</aside>

## My Space 🪐

---

![KakaoTalk_20250109_114645812](https://github.com/user-attachments/assets/f73f82f3-3748-4480-9d4d-d1ee14e8450d)
![KakaoTalk_20250109_114706336](https://github.com/user-attachments/assets/79c92695-56a1-4464-94b2-bf977731a95f)


<aside>
👾

My space는 버킷리스트를 추가할 수 있는 **3D 우주 공간**을 보여줍니다. 왼쪽 하단에 있는 버킷리스트 추가 버튼을 누르고 버킷리스트를 한 후 To Space 버튼을 누르면 랜덤 행성이 3D 우주 공간 내의 랜덤한 위치에 생성됩니다. 그 행성을 한 번 더 누르면 달성 처리가 가능하고, 축하하는 의미에서 별똥별 이펙트가 보여지게 됩니다. ‘다음 생에’ 버튼을 누르면 버킷리스트를 포기한 것이 되어 우주 공간에서 랜덤 행성이 사라지게 됩니다. 

</aside>

## Gallery 🛰️

---



https://github.com/user-attachments/assets/937bf78a-0c09-442b-befa-360de3455e45



<aside>
👾

Gallery는 3*3 형태의 랜덤한 우주 관련 이미지를 불러옵니다. 마우스 호버 시 그 이미지에 대한 설명이 뜹니다. 새로고침 할 때마다 이미지는 랜덤하게 다시 불러와지게 됩니다. 이는 나사 APOD api를 통해서 구현하였습니다.

</aside>

## Horoscope 🔮

---


https://github.com/user-attachments/assets/30ceef27-bcdc-4972-a49e-de6195e5bf99



<aside>
👾

Horoscope 탭에서는 별자리에 따른 오늘의 운세를 점쳐볼 수 있습니다. 본인의 별자리를 찾아서 클릭하면 오늘의 운세 탭으로 이동하게 됩니다. 이 탭에서는 openAI API를 통해 데이터를 받아와 보여줍니다. 

</aside>

## Friend 👽

---



https://github.com/user-attachments/assets/9cc11139-21e8-44f0-be57-29238fc1d396


<aside>
👾

Friend 탭은 친구 목록 및 그 친구의 버킷리스트, 달성상태를 확인할 수 있는 탭입니다. 구글 이메일을 통해서 친구  요청을 보낼 수 있고 친구가 친구 수락을 누르면 즉시 친구 목록에서 보여지게 됩니다.  또 친구의 버킷리스트 달성 상태 또한 실시간으로 확인할 수 있습니다. ‘추방’ 버튼을 누르면 친구가 친구 탭에서 사라지게 됩니다. 

</aside>

## Mypage 👩‍🚀

---




https://github.com/user-attachments/assets/3893c4d5-aef2-4fc8-8e0c-6585d9754916


<aside>
👾

Mypage에서는 내가 달성한 버킷리스트들을 확인할 수 있습니다. 버킷리스트를 달성하는 게 별을 수집하는 게 되는 컨셉이라 별을 모았다고 표현해보았습니다. 우측 하단의 로그아웃 버튼을 통해 로그아웃도 가능합니다. 

</aside>
