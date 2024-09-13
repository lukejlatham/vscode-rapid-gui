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
  tokens,
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
    color: tokens.colorNeutralForeground2,
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
    <div className={styles.container} role="region" aria-label="Font Selection">
      <Breadcrumb className={styles.breadcrumb} aria-label="Navigation">
        <BreadcrumbItem>
          <Body2>
            <FormattedMessage id="leftSidebar.theme" defaultMessage="Theme" />
          </Body2>
        </BreadcrumbItem>
      </Breadcrumb>
      <Caption1 className={styles.caption}>
        <FormattedMessage
          id="leftSidebar.theme.caption"
          defaultMessage="Select a font, theme or background color for your design"
        />
      </Caption1>
      <Label htmlFor={selectId}>
        <FormattedMessage id="theme.selectFont" defaultMessage="Select Font" />
      </Label>
      <Select
        id={selectId}
        className={styles.select}
        value={selectedFont}
        onChange={(e, data) => setSelectedFont(data.value)}
        aria-label="Select a font"
      >
        <option value="" disabled>
          <FormattedMessage id="theme.selectFont" defaultMessage="Select Font" />
        </option>
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
        aria-label="Apply selected font"
      >
        <FormattedMessage id="theme.applyFont" defaultMessage="Apply Font" />
      </Button>
    </div>
  );
};