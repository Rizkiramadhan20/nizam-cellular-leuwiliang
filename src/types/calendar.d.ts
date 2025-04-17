declare namespace JSX {
  interface IntrinsicElements {
    'calendar-date': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      className?: string;
      slot?: string;
    };
    'calendar-month': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

declare module 'cally' {
  export interface CallyProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    slot?: string;
  }
}