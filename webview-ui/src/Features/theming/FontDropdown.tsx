import * as React from "react";
import {
  Select,
  makeStyles,
  useId,
  Button,
  Label,
  Breadcrumb,
  BreadcrumbItem,
  Body2,
  Caption1,
} from "@fluentui/react-components";
import { TextFont20Filled, ChevronRight16Filled } from "@fluentui/react-icons";
import { useEditor } from "@craftjs/core";
import { FormattedMessage } from "react-intl";
import { fontNames } from "../../types";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    paddingBottom: "15px",
    width: "50%",
  },
  fontPreview: {
    marginLeft: "10px",
  },
  select: {
    width: "100%",
  },
  breadcrumb: {
    marginBottom: '2px',
  },
  caption: {
    color: '#d6d6d6',
    marginBottom: '5px'
  }
});

const fontList = fontNames;

export const FontDropdown: React.FC = () => {
  const selectId = useId("select");
  const { actions, query } = useEditor();
  const [selectedFont, setSelectedFont] = React.useState<string>("");
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
       <Breadcrumb className={styles.breadcrumb}>
  <BreadcrumbItem>
    <Body2>
      Theme
    </Body2>
  </BreadcrumbItem>
</Breadcrumb>
<Caption1 className={styles.caption}>
  Select a font, theme or background color for your design
      </Caption1>
      <Select
        id={selectId}
        className={styles.select}
        value={selectedFont}
        onChange={(e) => setSelectedFont(e.target.value)}
      >
        <option value="" disabled>Select a font</option>
        {fontList.map((font) => (
          <option key={font} value={font} style={{ fontFamily: font }}>
            {font}
          </option>
        ))}
      </Select>

      <Button
        icon={<TextFont20Filled />}
        size="medium"
        appearance="primary"
        onClick={handleApplyFont}
      >
        <FormattedMessage id="font.applyFont" defaultMessage="Apply Font" />
      </Button>
    </div>
  );
};