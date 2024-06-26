// import * as React from "react";
// import { Label as FluentLabel } from "@fluentui/react-components";
// import { useNode, UserComponent } from '@craftjs/core';

// interface LabelProps {
//     text: string;
// }

// export const Label: UserComponent<LabelProps> = ({ text }) => {
//     const { connectors: { connect, drag } } = useNode();
//     return (
//         <FluentLabel ref={dom => {
//             if (dom) connect(drag(dom));
//         }}>
//             {text}
//         </FluentLabel>
//     );
// };

// Label.craft = {
//     props: {
//         text: 'Label',
//     }
// };