import * as React from "react";
import {
  Dropdown,
  makeStyles,
  Option,
  useId,
  Button,
} from "@fluentui/react-components";
import { TextFont20Filled } from "@fluentui/react-icons";
import type { DropdownProps } from "@fluentui/react-components";
import { useEditor } from "@craftjs/core";
import { FormattedMessage } from "react-intl";

// You might want to replace this with your actual font list
const fontList = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier New",
  "Verdana",
  "Georgia",
  "Palatino",
  "Garamond",
  "Bookman",
  "Comic Sans MS",
  "Trebuchet MS",
  "Arial Black",
  "Impact",
];

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  fontPreview: {
    marginLeft: "10px",
  },
});

export const FontDropdown: React.FC<Partial<DropdownProps>> = (props) => {
  const dropdownId = useId("dropdown");
  const { actions, query } = useEditor();
  const [selectedFont, setSelectedFont] = React.useState<string | null>(null);
  const styles = useStyles();

  const handleApplyFont = () => {
    if (!selectedFont) return;

    const nodes = query.getNodes();
    Object.keys(nodes).forEach((id) => {
      const node = query.node(id).get();
      if (node.data.props && node.data.props.fontFamily) {
        actions.setProp(id, (props) => {
          props.fontFamily = selectedFont;
        });
      }
    });
  };

  return (
    <div className={styles.container}>
      <Dropdown
        size="medium"
        aria-labelledby={dropdownId}
        onOptionSelect={(event, data) => {
          if (data.optionValue) {
            setSelectedFont(data.optionValue);
          }
        }}
        {...props}
        placeholder="Select a font"
      >
        {fontList.map((font) => (
          <Option key={font} text={font} value={font}>
            <span style={{ fontFamily: font }}>{font}</span>
          </Option>
        ))}
      </Dropdown>

      <Button
        icon={<TextFont20Filled/>}
        size="medium"
        appearance="primary"
        onClick={handleApplyFont}
      >
        <FormattedMessage id="font.applyFont" defaultMessage="Apply Font" />
      </Button>
    </div>
  );
};