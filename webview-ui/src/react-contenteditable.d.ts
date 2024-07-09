declare module 'react-contenteditable' {
  import React from 'react';

  interface ContentEditableEvent {
	target: { value: string };
  }

  interface ContentEditableProps {
	html: string;
	disabled?: boolean;
	onChange?: (e: ContentEditableEvent) => void;
	tagName?: string;
	className?: string;
	style?: React.CSSProperties;
  }

  const ContentEditable: React.FC<ContentEditableProps>;
  export default ContentEditable;
}