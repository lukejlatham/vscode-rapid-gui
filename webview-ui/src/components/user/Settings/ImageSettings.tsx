import React, {useState} from 'react';
import { useNode } from '@craftjs/core';
import { ImageProps, TooltipConfigImage as TooltipConfig } from '../../../types';
import { Input, Label, Tooltip, useId, mergeClasses, SpinButton, SpinButtonChangeEvent, SpinButtonOnChangeData } from '@fluentui/react-components';
import { usePropertyInspectorStyles } from '../../../hooks/usePropertyInspectorStyles';
import { Info16Regular } from '@fluentui/react-icons';
import { UserImageUploadButton } from '../../UserImageUploadButton';

// TODO: add tooltips to image settings
export const ImageSettings: React.FC = () => {
    const { actions: { setProp }, props } = useNode((node) => ({
      props: node.data.props as ImageProps
    }));
  
    const styles = usePropertyInspectorStyles();

    const contentId = useId("content");
    const [visibleTooltip, setVisibleTooltip] = React.useState<string | null>(null);

    const tooltips: TooltipConfig[] = [
        { label: "Source", content: "Provide the URL of the image.", propKey: "src", type: "text" },
        { label: "Alt", content: "Provide a description of the image to be displayed if the image can't be seen.", propKey: "alt", type: "text" },
        { label: "Width", content: "Change the width of the image.", propKey: "width", type: "spinButton" },
        { label: "Height", content: "Change the height of the image.", propKey: "height", type: "spinButton" },
    ];

    const handleVisibilityChange = (tooltipKey: string, isVisible: boolean) => {
      setVisibleTooltip(isVisible ? tooltipKey : null);
  };

//   const [imageSrc, setImageSrc] = useState(props.src);

  const handleImageUpload = (filePath: string) => {
    // setImageSrc(filePath);
    setProp((props: ImageProps) => {
      props.src = filePath;
    }, 1000);
  };
  
    return (
      <div className={styles.settingsContainer}>
            <UserImageUploadButton onUpload={handleImageUpload} />
        {tooltips.map((tooltip, index) => (
                <div key={index}>
                    <div aria-owns={visibleTooltip === tooltip.propKey ? contentId : undefined} className={styles.label}>
                        <Label>
                            {tooltip.label}
                        </Label>
                        <Tooltip
                            content={{
                                children: tooltip.content,
                                id: contentId,
                            }}
                            positioning="above-start"
                            withArrow
                            relationship="label"
                            onVisibleChange={(e, data) => handleVisibilityChange(tooltip.propKey, data.visible)}
                        >
                            <Info16Regular
                                tabIndex={0}
                                className={mergeClasses(visibleTooltip === tooltip.propKey && styles.visible)}
                            />
                        </Tooltip>
                    </div>
                    {tooltip.type === "spinButton" ? (
                        <SpinButton
                            className={styles.spinButton}
                            defaultValue={props[tooltip.propKey] as number}
                            onChange={(event: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                                const value = data.value ? data.value : 0;
                                setProp((props: ImageProps) => {
                                    (props[tooltip.propKey] as number) = value;
                                }, 1000);
                            }}
                        />
                    ) : tooltip.type === "text" && (
                        <Input
                            className={styles.textInput}
                            type="text"
                            defaultValue={props[tooltip.propKey] as string}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setProp((props: ImageProps) => {
                                    (props[tooltip.propKey] as string) = e.target.value;
                                }, 1000);
                            }}
                        />
                    )}
                </div>
            ))}
      </div>
    );
  };
  