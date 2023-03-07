import renderer from "react-test-renderer";
import App from "../../resources/js/components/App";

test("rendering App component", function () {
    const component = renderer.create(<App />).toJSON();

    expect(component).toMatchSnapshot();
});
