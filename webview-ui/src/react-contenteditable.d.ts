declare module 'react-contenteditable' {
  import React from 'react';
  interface ContentEditableProps {
	html: string;
	disabled?: boolean;
	onChange?: (e: React.SyntheticEvent) => void;
	tagName?: string;
	className?: string;
	style?: React.CSSProperties;
  }

  const ContentEditable: React.FC<ContentEditableProps>;
  export default ContentEditable;
}