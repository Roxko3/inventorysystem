import renderer from "react-test-renderer";
import app from "../../resources/js/app";

test("rendering app.js", function () {
    const component = renderer.create(<app></app>).toJSON();

    expect(component).toMatchSnapshot();
});
