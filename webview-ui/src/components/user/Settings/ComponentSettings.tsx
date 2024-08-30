import React, { useState, useCallback, useEffect } from "react";
import {
  Select,
  Input,
  Label,
  SpinButton,
  Radio,
  Slider,
  SliderOnChangeData,
  RadioGroup,
  SpinButtonChangeEvent,
  SpinButtonOnChangeData,
  Tooltip,
  useId,
  mergeClasses,
  Textarea,
} from "@fluentui/react-components";
import { Info16Regular } from "@fluentui/react-icons";
import { useNode } from "@craftjs/core";
import { usePropertyInspectorStyles } from "../../../hooks/usePropertyInspectorStyles";
import {
  ComponentSettingsProps,
  CheckboxesProps,
  RadioButtonProps,
  DropdownProps,
  ImageProps,
  TooltipConfigs,
} from "../../../types";
import { UserImageUploadButton } from "../../../Features/uploadImage/UserImageUploadButton";
import { GenerateImageButton } from "../../../Features/generateImage/GenerateImageButton";
import { vscode } from "../../../utilities/vscode";

export const ComponentSettings: React.FC<ComponentSettingsProps> = ({
  componentProps,
  tooltips,
  isLoading,
  setIsLoading,
}) => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as typeof componentProps,
  }));

  interface UploadedImage {
    filepath: string;
    filename: string;
  }

  const [srcOption, setSrcOption] = useState<string>("");
  // uploadedImages is an array of file paths and file
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const propsWithOptions =
    (props as CheckboxesProps) || (props as RadioButtonProps) || (props as DropdownProps);
  const propInspector = usePropertyInspectorStyles();
  const contentId = useId("content");
  const [visibleTooltip, setVisibleTooltip] = React.useState<string | null>(null);

  const handleVisibilityChange = (tooltipKey: string, isVisible: boolean) => {
    setVisibleTooltip(isVisible ? tooltipKey : null);
  };

  // Default option labels for checkboxes, radio buttons, and dropdowns
  const defaultOptionLabels = (count: number) =>
    Array.from({ length: count }, (_, i) => `Option ${i + 1}`);

  // Update option labels based on the number of options
  const updateOptionLabels = useCallback(
    (numberOfOptions: number) => {
      setProp((props: typeof propsWithOptions) => {
        const currentLabels = props.optionLabels || [];
        const updatedLabels = defaultOptionLabels(numberOfOptions);

        if (currentLabels.length >= numberOfOptions) {
          props.optionLabels = currentLabels.slice(0, numberOfOptions);
        } else {
          props.optionLabels = [...currentLabels, ...updatedLabels.slice(currentLabels.length)];
        }
      });
    },
    [setProp]
  );

  useEffect(() => {
    if ("src" in props) {
      vscode.postMessage({
        command: "getUploadedImages",
      });
    }

    const messageHandler = (event: MessageEvent) => {
      const message = event.data;
      if (message.command === "setUploadedImages") {
        const images = message.content.map((filepath: string) => {
          // Extract the filename from the filepath
          const filename = filepath.split("/").pop() || filepath;
          return { filepath, filename };
        });

        setUploadedImages(images);
      }
    };

    window.addEventListener("message", messageHandler);

    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, [props]);

  // Update option labels when the number of options changes
  useEffect(() => {
    if ("numberOfBoxes" in props) {
      updateOptionLabels((props as CheckboxesProps).numberOfBoxes);
    } else if ("numberOfButtons" in props) {
      updateOptionLabels((props as RadioButtonProps).numberOfButtons);
    } else if ("numberOfOptions" in props) {
      updateOptionLabels((props as DropdownProps).numberOfOptions);
    }
  }, [props, updateOptionLabels]);

  // Handle image upload
  const handleImageUpload = (filePath: string) => {
    if (setIsLoading) {
      setIsLoading(true);
    }
    setProp((props: ImageProps) => {
      props.src = filePath;
    }, 1000);
    // setUploadedImages([...uploadedImages, filePath]);
    if (setIsLoading) {
      setTimeout(() => setIsLoading(false), 1000); // Simulating image load
    }
  };

  return (
    <div className={propInspector.settingsContainer}>
      {tooltips.map((tooltip, index) => {
        const propValue = props[tooltip.propKey as keyof typeof props];

        return (
          <div key={index}>
            <div
              aria-owns={visibleTooltip === tooltip.propKey ? contentId : undefined}
              className={propInspector.label}>
              <Label
                htmlFor={tooltip.propKey}
              >{tooltip.label}</Label>
              <Tooltip
                content={{
                  children: tooltip.content,
                  id: contentId,
                }}
                positioning="above-start"
                withArrow
                relationship="label"
                onVisibleChange={(e, data) =>
                  handleVisibilityChange(tooltip.propKey, data.visible)
                }
                >
                <Info16Regular
                  tabIndex={0}
                  className={mergeClasses(
                    visibleTooltip === tooltip.propKey && propInspector.visible
                  )}
                />
              </Tooltip>
            </div>
            {tooltip.type === "color" ? (
              <input
                className={propInspector.colorInput}
                type="color"
                defaultValue={propValue as string}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProp((props: typeof componentProps) => {
                    (props[tooltip.propKey as keyof typeof props] as string) = e.target.value;
                  })
                }
              />
            ) : tooltip.type === "textarea" ? (
              <Textarea
                className={propInspector.textarea}
                placeholder="Text here..."
                defaultValue={propValue as string}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setProp((props: typeof componentProps) => {
                    (props[tooltip.propKey as keyof typeof props] as string) = e.target.value;
                  }, 1000);
                }}
              />
            ) : tooltip.type === "dropdown" ? (
              <div className={propInspector.srcDropdown}>
                <Select
                  id={tooltip.propKey}
                  onChange={(e, data) => {
                    setSrcOption(data.value as string);
                  }}>
                  <option value="">Select image source</option>
                  <option value="url">URL</option>
                  <option value="upload">Upload</option>
                </Select>
                {
                  // Display image upload button if the component has an 'src' prop
                  srcOption === "upload" ? (
                    <div className={propInspector.imageUploaded}>
                      <UserImageUploadButton onUpload={handleImageUpload} />
                      {
                        // display dropdown selection of uploaded images if it exists
                        uploadedImages.length > 0 && (
                          <Select
                            onChange={(e, data) => {
                              handleImageUpload(data.value as string);
                            }}>
                            <option value="">Select image</option>
                            {uploadedImages.map((image, index) => (
                              <option key={index} value={image.filepath}>
                                {image.filename}
                              </option>
                            ))}
                          </Select>
                        )
                      }
                    </div>
                  ) : (
                    srcOption === "url" && (
                      <Input
                        className={propInspector.textInput}
                        type="text"
                        defaultValue={propValue as string}
                        // disable if isLoading true and propKey is 'alt'
                        disabled={isLoading && tooltip.propKey === "alt"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setProp((props: typeof componentProps) => {
                            (props[tooltip.propKey as keyof typeof props] as string) =
                              e.target.value;
                          }, 1000);
                        }}
                      />
                    )
                  )
                }
              </div>
            ) : tooltip.type === "slider" ? (
              <div className={propInspector.sliderSection}>
                <Slider
                  className={propInspector.slider}
                  value={propValue as number}
                  min={0}
                  onChange={(e: React.FormEvent<HTMLInputElement>, data: SliderOnChangeData) => {
                    setProp((props: typeof componentProps) => {
                      (props[tooltip.propKey as keyof typeof props] as number) = data.value;
                    }, 1000);
                  }}
                />
                <SpinButton
                  className={propInspector.sliderSpinButton}
                  value={propValue as number}
                  min={0}
                  onChange={(e: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                    try {
                      if (data.value === undefined) {
                        const parsedValue = parseFloat(data.displayValue as string);
                        if (isNaN(parsedValue)) {
                          throw new Error("Non-numerical value");
                        }
                        if (parsedValue < 0 || parsedValue > 100) {
                          throw new Error("Value out of bounds");
                        }
                        setProp((props: typeof componentProps) => {
                          (props[tooltip.propKey as keyof typeof props] as number) = parsedValue;
                        }, 1000);
                      } else if (data.value !== null) {
                        setProp((props: typeof componentProps) => {
                          (props[tooltip.propKey as keyof typeof props] as number) =
                            data.value as number;
                        }, 1000);
                      } else {
                        setProp((props: typeof componentProps) => {
                          (props[tooltip.propKey as keyof typeof props] as number) = 1;
                        }, 1000);
                      }
                    } catch (error) {
                      console.error("Error parsing value:", error);
                      setProp((props: typeof componentProps) => {
                        (props[tooltip.propKey as keyof typeof props] as number) = 1;
                      }, 1000);
                    }
                  }}
                />
              </div>
            ) : tooltip.type === "spinButton" ? (
              <SpinButton
                value={propValue as number}
                displayValue={propValue as string}
                min={1}
                max={15}
                onChange={(e: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
                  try {
                    if (data.value === undefined) {
                      const parsedValue = parseFloat(data.displayValue as string);
                      if (isNaN(parsedValue)) {
                        throw new Error("Non-numerical value");
                      }
                      if (parsedValue < 1 || parsedValue > 15) {
                        throw new Error("Value out of bounds");
                      }
                      setProp((props: typeof componentProps) => {
                        (props[tooltip.propKey as keyof typeof props] as number) = parsedValue;
                      }, 1000);
                    } else if (data.value !== null) {
                      setProp((props: typeof componentProps) => {
                        (props[tooltip.propKey as keyof typeof props] as number) =
                          data.value as number;
                      }, 1000);
                    } else {
                      setProp((props: typeof componentProps) => {
                        (props[tooltip.propKey as keyof typeof props] as number) = 1;
                      }, 1000);
                    }
                  } catch (error) {
                    console.error("Error parsing value:", error);
                    setProp((props: typeof componentProps) => {
                      (props[tooltip.propKey as keyof typeof props] as number) = 1;
                    }, 1000);
                  }
                }}
                className={propInspector.spinButton}
              />
            ) : tooltip.type === "text" ? (
              <div className={propInspector.srcDropdown}>
                <Input
                  className={propInspector.textInput}
                  type="text"
                  defaultValue={propValue as string}
                  // disable if isLoading true and propKey is 'alt'
                  disabled={isLoading && tooltip.propKey === "alt"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setProp((props: typeof componentProps) => {
                      (props[tooltip.propKey as keyof typeof props] as string) = e.target.value;
                    }, 1000);
                  }}
                />
                {"alt" in props && props.alt !== "" && setIsLoading && (
                  <GenerateImageButton
                    alt={props.alt}
                    onUpload={handleImageUpload}
                    isLoading={isLoading || false}
                    setIsLoading={setIsLoading}
                  />
                )}
              </div>
            ) : tooltip.type === "icon" ? (
              <RadioGroup
                defaultValue={propValue as string}
                layout="horizontal-stacked"
                onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                  setProp((props: typeof componentProps) => {
                    (props[tooltip.propKey as keyof typeof props] as "none" | "left" | "right") =
                      data.value as "none" | "left" | "right";
                  }, 1000);
                }}>
                <Radio key="none" label="None" value="none" />
                <Radio key="left" label="Left" value="left" />
                <Radio key="right" label="Right" value="right" />
              </RadioGroup>
            ) : tooltip.type === "textAlign" ? (
              <RadioGroup
                defaultValue={propValue as string}
                layout="vertical"
                onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                  setProp((props: typeof componentProps) => {
                    (props[tooltip.propKey as keyof typeof props] as
                      | "left"
                      | "center"
                      | "right"
                      | "justify") = data.value as "left" | "center" | "right" | "justify";
                  }, 1000);
                }}>
                <Radio key="left" label="Left" value="left" />
                <Radio key="center" label="Center" value="center" />
                <Radio key="right" label="Right" value="right" />
                <Radio key="justify" label="Justify" value="justify" />
              </RadioGroup>
            ) : tooltip.type === "direction" ? (
              <RadioGroup
                defaultValue={props[tooltip.propKey as keyof typeof props]}
                layout="horizontal-stacked"
                onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                  setProp((props: typeof componentProps) => {
                    (props[tooltip.propKey as keyof typeof props] as "row" | "column") =
                      data.value as "row" | "column";
                  }, 1000);
                }}>
                <Radio key="row" label="Row" value="row" />
                <Radio key="column" label="Column" value="column" />
              </RadioGroup>
            ) : tooltip.type === "options" && "optionLabels" in props ? (
              <div className={propInspector.optionLabels}>
                {propsWithOptions.optionLabels.map((label, index) => (
                  <div key={index}>
                    <Input
                      className={propInspector.textInput}
                      type="text"
                      defaultValue={label}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProp((props: typeof propsWithOptions) => {
                          props.optionLabels[index] = e.target.value;
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : tooltip.type === "justifyContent" ? (
              <RadioGroup
                defaultValue={props[tooltip.propKey as keyof typeof props]}
                layout="vertical"
                onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                  setProp((props: typeof componentProps) => {
                    (props[tooltip.propKey as keyof typeof props] as
                      | "flex-start"
                      | "center"
                      | "flex-end"
                      | "space-between"
                      | "space-around") = data.value as
                      | "flex-start"
                      | "center"
                      | "flex-end"
                      | "space-between"
                      | "space-around";
                  }, 1000);
                }}>
                <Radio key="start" label="Start" value="flex-start" />
                <Radio key="center" label="Center" value="center" />
                <Radio key="end" label="End" value="flex-end" />
                <Radio key="space-between" label="Space Between" value="space-between" />
                <Radio key="space-around" label="Space Around" value="space-around" />
              </RadioGroup>
            ) : tooltip.type === "alignItems" ? (
              <RadioGroup
                defaultValue={props[tooltip.propKey as keyof typeof props]}
                layout="vertical"
                onChange={(e: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
                  setProp((props: typeof componentProps) => {
                    (props[tooltip.propKey as keyof typeof props] as
                      | "flex-start"
                      | "center"
                      | "flex-end") = data.value as "flex-start" | "center" | "flex-end";
                  }, 1000);
                }}>
                <Radio key="start" label="Start" value="flex-start" />
                <Radio key="center" label="Center" value="center" />
                <Radio key="end" label="End" value="flex-end" />
              </RadioGroup>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
