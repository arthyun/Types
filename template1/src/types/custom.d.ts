/* 에디터에 들어갈 style 태그 적용값 */
import 'react';

declare module 'react' {
   interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
      jsx?: boolean;
      global?: boolean;
   }
}
