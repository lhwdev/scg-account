# api 유틸리티

> NOTE: 기존 utils를 utils_old로 갈아엎으면서 확실히 라이브러리를 만들 때에는 생각없이 코딩하지 말고 열심히 계획해야 한다는 것을 깨달았다. 그래서! 이건 계획서!

api(가명, 뭔가 좋은 이름 없나?)의 api는 세 부분으로 나뉩니다.

**기본적인 구분:**

- **builder**: api description을 build할 수 있는 유틸리티.  
  특징: type safe함. 모든 함수의 parameter가 generic 타입이고 const type parameter임. 입력한 타입이 그대로 출력한 타입에 반영됩니다.
- api description: api 구조 그 자체.
- frontend/backend: api description에서 매핑한 frontend에서 사용할 HTTP stub과 backend에서 구현할 인터페이스 타입.


**구성요소들:**

- **Parameter**: 프론트랑 백이 서로 주고받는 데이터. Parameter 인터페이스의 구현체는 모델 데이터 <-> HTTP 데이터로 변환할 수 있어야 합니다.
- **InputParameter**: `y = apiFunction(x)`에서 x. 프론트엔드에서 백엔드로 전달되는 매개변수.
- **OutputParameter**: y. 백엔드에서 백엔드로 전달되는 매개변수.

## api-builder

- **InputFunction**: builder의 요소로 input의 구조를 짓는 함수. 원래는 사용자가 하나하나 Parameter를 구현해야 하지만 그건 좀 귀찮기에 좀 개선한 것.
  
  ``` js
  procedure.input(request => ({
    user: param(User, request.headers.authorization)
  }))
  ```

  이렇게 되면 `User[serializerSymbol]`만 구현하면 됩니다.
  아니면 `param.int(request.queryParams.id)`라던지 <code>param.template\`user#${number}\`(request.pathParams.user)</code> 같은 것도 가능합니다. 눈치채셨다시피 `headers`, `queryParams` 등은 다 proxy 객체입니다.

  ``` ts
  type InputFunction<
    T extends InputParameter,
    Previous extends InputParameter,
  > = (request: RequestProxy, previous: Previous) => T

  procedure.input((request, previous) => ({
    target_user: previous.target_user.validate(user => {
      if(!user.isAdmin) throw "ho";
    },
    article: param(Article.byId, request.queryPararms.id),

  }))
  ```

- **PartialInputContainer**: build 단계에서는 parent의 input 값에 직접 접근할 수 없습니다. 타입으로만 접근 가능하죠. 그래서 builder 단계에서는 `PartialInputContainer`를 씁니다.
- **InputContainer**: api description에서 input의 구조를 설명하기 위해 씁니다.
  참고로 `PartialInputContainer.prototype.build(parent: InputContainer): InputContainer`로 만들 수 있습니다. 당연히 말했다시피 `PartialInputContainer`와 `InputContainer`는 아주 strongly-typed입니다. 안에 있는 객체의 타입을 고스란히 담고 있습니다.
