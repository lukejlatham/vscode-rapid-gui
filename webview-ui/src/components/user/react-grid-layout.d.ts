declare module 'react-grid-layout' {
	import { Component } from 'react';
	export interface Layout {
		i: string;
		x: number;
		y: number;
		w: number;
		h: number;
		minW?: number;
		minH?: number;
		maxW?: number;
		maxH?: number;
		static?: boolean;
		isResizable?: boolean;
		isDraggable?: boolean;
	}
	export interface ReactGridLayoutProps {
		className?: string;
		style?: React.CSSProperties;
		width?: number;
		cols?: number;
		rowHeight?: number;
		layout?: Layout[];
		onLayoutChange?: (layout: Layout[]) => void;
		isResizable?: boolean;
		isDraggable?: boolean;
		[key: string]: any;
	}
	export default class ReactGridLayout extends Component<ReactGridLayoutProps> {}
}