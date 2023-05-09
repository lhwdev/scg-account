# scg-account

연습삼아 Reinvent the wheels를 몸소 실천하고 있습니다.

## `main` 브랜치

엄 그냥 관련 내부 서비스 전반에 SSO가 있으면 좋겠다고 생각해서 만들기 시작하긴 했습니다.
개쩌는 UI + 백엔드 + OpenID Connect 구현체 등등이에요

## `utility` 브랜치

(만들다가 잠시 묻어둔)

그냥 프로젝트 구조랑 아키텍쳐 실험하는 곳이에요!

## `utility-v2` 브랜치

TS의 타입은 컴파일하면 모두 날라가기 때문에 builder api를 만들어서 하는 방식을 썼었는데,
[deepkit](https://deepkit.io/)이라는 요물을 발견해서 저걸로 자바의 Retrofit처럼
interface 형태 기반의 무언가를 해보려고 합니다.

근데 저거 컴파일 타임에 실행하는 걸로 못바꾸나? 아무튼
이걸 쓰면 validation을 직접 쓸 필요가 없어집니다. 그냥 타입 그자체로 검증이 되는 거에요.
다만 serialization은 좀더 생각해봐야 하겠죠. 하지만 클래스를 인자로 받는다면 막 새로운
오브젝트 생성이 아니라 클래스 constructor을 통한 생성을 하고, serialization도 원하면
할 수 있는 그런 시스템을 만들려고 합니다.
