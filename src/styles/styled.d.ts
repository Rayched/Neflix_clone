import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        logoColor: string;
        headerColor: string;
        bgColor: string;
        contentsColor: string;
        barColor: string;
        textColor: string;
    }
};

/**
 * declare module 'styled-components'
 * => 모듈을 확장하여, TypeScript가 사용자가 정의한 속성을
 *    추가할 수 있게 해준다.
 * 
 * interface DefaultTheme 
 * => 'DefaultTheme'은 styled-components에서 제공되는 인터페이스
 *     이걸 직접적으로 수정해서 사용할 수는 없으므로
 *     간접적인 방식으로 별도의 파일에서 확장하여
 *     사용자 정의 속성을 추가할 수 있게 해준다.
 */