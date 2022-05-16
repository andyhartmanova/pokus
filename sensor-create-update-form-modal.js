//@@viewOn:imports
import { createVisualComponent, Utils, Lsi, PropTypes } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import LSI from "../config/lsi.js";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const SensorCreateUpdateFormModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SensorCreateUpdateFormModal",
  nestingLevel: ["bigBoxCollection", "bigBox"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    selectedSensor: PropTypes.object,
    locations: PropTypes.array,
    setSelectedSensor: PropTypes.func,
    handleCreateSensor: PropTypes.func,
    handleUpdateSensor: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    selectedSensor: undefined,
    locations: undefined,
    setSelectedSensor: undefined,
    handleCreateSensor: undefined,
    handleUpdateSensor: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, SensorCreateUpdateFormModal);

    const locationsForSelect = props.locations.map((location) => {
      return { value: location.code, children: location.name };
    });
    
    return currentNestingLevel ? (
      <Uu5Forms.Form.Provider
        onSubmit={async (e) => {
          try {
            if (props.selectedSensor.code) {
              await props.handleUpdateSensor({
                id: props.selectedSensor.id,
                code: props.selectedSensor.code,
                ...e.data.value,
              });
            } else {
              await props.handleCreateSensor(e.data.value);
            }
            props.setSelectedSensor(null);
          } catch (e) {
            throw new Utils.Error.Message(LSI.controls.unsuccessful, e);
          }
        }}
        {...attrs}
      >
        <Uu5Elements.Modal
          open={true}
          onClose={() => props.setSelectedSensor(null)}
          header={
            props.selectedSensor.code ? (
              <Lsi lsi={LSI.sensorManagement.updateSensor} />
            ) : (
              <Lsi lsi={LSI.sensorManagement.createSensor} />
            )
          }
          footer={
            <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "flex-end" })}>
              <Uu5Forms.CancelButton onClick={() => props.setSelectedSensor(null)} />
              <Uu5Forms.SubmitButton>
                {props.selectedSensor.code ? <Lsi lsi={LSI.controls.update} /> : <Lsi lsi={LSI.controls.create} />}
              </Uu5Forms.SubmitButton>
            </div>
          }
        >
          <Uu5Forms.Form.View>
            <div
              className={Config.Css.css({
                display: "grid",
                rowGap: 4,
                columnGap: 32,
                gridAutoFlow: "column",
                gridTemplateRows: "repeat(2, auto)",
                marginBottom: 8,
              })}
            >
              <div>
                <Uu5Forms.FormText
                  name="code"
                  label={<Lsi lsi={LSI.sensorManagement.code} />}
                  placeholder={props.selectedSensor.code || ""}
                  disabled={props.selectedSensor.code ? true : false}
                  required
                />
              </div>
              <div>
                <Uu5Forms.FormText
                  name="name"
                  label={<Lsi lsi={LSI.sensorManagement.name} />}
                  placeholder={props.selectedSensor.name || ""}
                  required
                />
              </div>
              <div>
                <Uu5Forms.FormText
                  name="location"
                  label={<Lsi lsi={LSI.sensorManagement.location} />}
                  placeholder={props.selectedSensor.location || ""}
                />
              </div>

              <div className={Config.Css.css({ display: "grid", rowGap: 8 })}>
                <Uu5Forms.FormSelect
                  name="location"
                  label={<Lsi lsi={LSI.sensorManagement.location} />}
                  required
                  itemList={locationsForSelect}
                />
              </div>

              <div className={Config.Css.css({ display: "grid", rowGap: 8 })}>
                <Uu5Forms.FormSelect
                  name="state"
                  label={<Lsi lsi={LSI.sensorManagement.state} />}
                  initialValue={(props.selectedSensor.state = "initial" ? "active" : props.selectedSensor.state)}
                  disabled={(props.selectedSensor.state = "initial" ? true : false)}
                  required
                  itemList={[
                    { value: "active", children: "active" },
                    { value: "passive", children: "passive" },
                    { value: "forbidden", children: "forbidden" },
                  ]}
                />
              </div>
            </div>
          </Uu5Forms.Form.View>
        </Uu5Elements.Modal>
      </Uu5Forms.Form.Provider>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SensorCreateUpdateFormModal };
export default SensorCreateUpdateFormModal;
//@@viewOff:exports
