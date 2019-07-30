var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

"use strict";

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      input: markdownText,
      windowsLeftRight: true
    };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleWindowsPosition = _this.handleWindowsPosition.bind(_this);
    _this.handleEraseText = _this.handleEraseText.bind(_this);
    return _this;
  }

  //Обработчик для вводимого текста в окне Редактора


  _createClass(App, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({
        input: event.target.value
      });
    }

    //Обработчик для кнопки "Позиция окон", которая переключает 
    //положение окон Редактора и Просмотрщика (вертикально либо 
    //горизонтально)

  }, {
    key: "handleWindowsPosition",
    value: function handleWindowsPosition() {
      this.setState({
        windowsLeftRight: !this.state.windowsLeftRight
      });
    }

    //Обработчик для кнопки "Ластик", которая очищает окно редактора 
    //для ввода нового текста

  }, {
    key: "handleEraseText",
    value: function handleEraseText() {
      if (window.confirm("Вы действительно хотите очистить окно редактора?")) {
        this.setState({
          input: ""
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var classes = this.state.windowsLeftRight ? {
        icon: 'fas fa-arrows-alt-v',
        content: 'content leftRight'
      } : {
        icon: 'fas fa-arrows-alt-h',
        content: 'content topBottom'
      };
      return React.createElement(
        "div",
        { className: "app" },
        React.createElement(
          "h1",
          null,
          "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0449\u0438\u043A Markdown \u043D\u0430 React"
        ),
        React.createElement(
          "div",
          { className: classes.content },
          React.createElement(
            "div",
            { className: "editorWrap" },
            React.createElement(
              "div",
              { className: "topMenu" },
              React.createElement(
                "header",
                { className: "header" },
                "\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440"
              ),
              React.createElement(
                "div",
                { className: "toolsMenu" },
                React.createElement(EraseText, {
                  input: this.state.input,
                  onClick: this.handleEraseText
                }),
                React.createElement(WindowsPosition, {
                  icon: classes.icon,
                  onClick: this.handleWindowsPosition,
                  windowsLeftRight: this.state.windowsLeftRight
                }),
                React.createElement(
                  "div",
                  null,
                  React.createElement(
                    "a",
                    {
                      href: "https://daringfireball.net/projects/markdown/syntax",
                      target: "_blank"
                    },
                    React.createElement("i", {
                      className: "far fa-question-circle",
                      title: "\u0421\u043F\u0440\u0430\u0432\u043A\u0430 \u043F\u043E Markdown"
                    })
                  )
                )
              )
            ),
            React.createElement(Editor, {
              value: this.state.input,
              onChange: this.handleChange
            })
          ),
          React.createElement(
            "div",
            { className: "previewWrap" },
            React.createElement(
              "div",
              { className: "topMenu" },
              React.createElement(
                "header",
                { className: "header" },
                "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0449\u0438\u043A"
              ),
              React.createElement(
                "div",
                { className: "toolsMenu" },
                React.createElement(WindowsPosition, {
                  icon: classes.icon,
                  onClick: this.handleWindowsPosition,
                  windowsLeftRight: this.state.windowsLeftRight
                })
              )
            ),
            React.createElement(Previewer, {
              markdown: this.state.input
            })
          )
        ),
        React.createElement(Footer, null)
      );
    }
  }]);

  return App;
}(React.Component);

var EraseText = function EraseText(props) {
  return React.createElement(
    "div",
    null,
    React.createElement("i", {
      className: "fas fa-eraser",
      title: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u0434\u043B\u044F \u0432\u0432\u043E\u0434\u0430 \u043D\u043E\u0432\u043E\u0433\u043E \u0442\u0435\u043A\u0441\u0442\u0430",
      onClick: props.onClick
    })
  );
};

var WindowsPosition = function WindowsPosition(props) {
  var title = props.windowsLeftRight ? "Расположить окна сверху и снизу" : "Расположить окна слева и справа";
  return React.createElement(
    "div",
    null,
    React.createElement("i", {
      className: props.icon,
      title: title,
      onClick: props.onClick
    })
  );
};

var Editor = function Editor(props) {
  return React.createElement("textarea", {
    className: "editor",
    id: "editor",
    value: props.value,
    onChange: props.onChange
  });
};

var Previewer = function Previewer(props) {
  return React.createElement("div", {
    className: "preview",
    id: "preview",
    dangerouslySetInnerHTML: { __html: marked(props.markdown) }
  });
};

var Footer = function Footer() {
  return React.createElement(
    "footer",
    { className: "footer" },
    React.createElement(
      "div",
      { className: "sourceCode" },
      React.createElement("i", {
        className: "fab fa-free-code-camp",
        title: "freeCodeCamp"
      }),
      React.createElement(
        "a",
        {
          href: "https://github.com/injashkin/React-Markdown-Previewer"
        },
        "\u0418\u0441\u0445\u043E\u0434\u043D\u0438\u043A \u043D\u0430 Github ",
        React.createElement("i", { className: "fab fa-github" })
      )
    ),
    React.createElement(
      "div",
      { className: "madeOn" },
      "\u0421\u0434\u0435\u043B\u0430\u043D\u043E \u043D\u0430:",
      React.createElement(
        "i",
        { className: "fab fa-html5", title: "HTML5" },
        " "
      ),
      React.createElement(
        "i",
        { className: "fab fa-css3", title: "CSS3" },
        " "
      ),
      React.createElement(
        "i",
        { className: "fab fa-font-awesome", title: "Font Awesome" },
        " "
      ),
      React.createElement(
        "i",
        { className: "fab fa-sass", title: "SCSS" },
        " "
      ),
      React.createElement("i", { className: "fab fa-js", title: "Javascript" }),
      React.createElement("i", { className: "fab fa-react", title: "React" })
    )
  );
};

var markdownText = "\u0411\u043E\u043B\u0435\u0435 \u043F\u043E\u043B\u043D\u043E\u0435 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u043C\u043E\u0436\u043D\u043E \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0442\u044C \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 https://marked.js.org/demo \u0441 \u043F\u0440\u0438\u043C\u0435\u0440\u0430\u043C\u0438 \u0441\u0438\u043D\u0442\u0430\u043A\u0441\u0438\u0441\u0430, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 [Markdown]. \n\n[Markdown]: http://daringfireball.net/projects/markdown/\n\n### \u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438\n\nMarkdown \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 \u0434\u0432\u0430 \u0441\u0442\u0438\u043B\u044F \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u0432, Setext \u0438 atx.\n\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438 \u0432 \u0441\u0442\u0438\u043B\u0435 Setext \u043F\u043E\u0434\u0447\u0435\u0440\u043A\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u0437\u043D\u0430\u043A\u043E\u0432 \u0440\u0430\u0432\u043D\u043E (\u0434\u043B\u044F \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u0432 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u0443\u0440\u043E\u0432\u043D\u044F) \u0438 \u0442\u0438\u0440\u0435 (\u0434\u043B\u044F \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u0432 \u0432\u0442\u043E\u0440\u043E\u0433\u043E \u0443\u0440\u043E\u0432\u043D\u044F). \u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440:\n\n\u042D\u0442\u043E H1\n=============\n\u042D\u0442\u043E H2\n-------------\n\u0414\u043B\u0438\u043D\u0430 \u043F\u043E\u0434\u0447\u0435\u0440\u043A\u0438\u0432\u0430\u043D\u0438\u044F \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u043B\u044C\u043D\u043E\u0439.\n\n\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438 \u0432 \u0441\u0442\u0438\u043B\u0435 Atx \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442 \u043E\u0442 1 \u0434\u043E 6 \u0440\u0435\u0448\u0435\u0442\u043E\u043A \u0432 \u043D\u0430\u0447\u0430\u043B\u0435 \u0441\u0442\u0440\u043E\u043A\u0438:\n# \u042D\u0442\u043E H1\n## \u042D\u0442\u043E H2\n###### \u042D\u0442\u043E H6\n\n\u041F\u0440\u0438 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u0438 \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0437\u0430\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438 \u0440\u0435\u0448\u0435\u0442\u043A\u0430\u043C\u0438. \u042D\u0442\u043E \u043C\u043E\u0436\u0435\u0442 \u043F\u043E\u043D\u0430\u0434\u043E\u0431\u0438\u0442\u0441\u044F \u0447\u0438\u0441\u0442\u043E \u0434\u043B\u044F \u043A\u0440\u0430\u0441\u043E\u0442\u044B:\n# \u042D\u0442\u043E H1 #\n## \u042D\u0442\u043E H2 ##\n### \u042D\u0442\u043E H3 ######\n\n### \u0418\u0441\u0445\u043E\u0434\u043D\u044B\u0439 \u043A\u043E\u0434\n\n\u041C\u043D\u043E\u0433\u043E\u0441\u0442\u0440\u043E\u0447\u043D\u044B\u0439 \u043A\u043E\u0434 \u0437\u0430\u043A\u043B\u044E\u0447\u0430\u0435\u043C \u0432 \u0442\u0440\u043E\u0439\u043D\u044B\u0435 \u0430\u043F\u043E\u0441\u0442\u0440\u043E\u0444\u044B (\u043A\u043B\u0430\u0432\u0438\u0448\u0430 \u0401).\n\n```\n// \u044D\u0442\u043E \u043C\u043D\u043E\u0433\u043E\u0441\u0442\u0440\u043E\u0447\u043D\u044B\u0439 \u043A\u043E\u0434:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine ==  && lastLine) {\n    return multiLineCode;\n  }\n}\n```\n\u0414\u043B\u044F \u0432\u0441\u0442\u0430\u0432\u043A\u0438 \u043A\u043E\u0434\u0430 \u0432\u043D\u0443\u0442\u0440\u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439 \u043D\u0443\u0436\u043D\u043E \u0437\u0430\u043A\u043B\u044E\u0447\u0430\u0442\u044C \u044D\u0442\u043E\u0442 \u043A\u043E\u0434 \u0432 \u043E\u0434\u0438\u043D\u0430\u0440\u043D\u044B\u0435 \u0430\u043F\u043E\u0441\u0442\u0440\u043E\u0444\u044B. \u041F\u0440\u0438\u043C\u0435\u0440: `<html class=\"app\">`.\n  \n\u0412\u044B \u0442\u0430\u043A\u0436\u0435 \u043C\u043E\u0436\u0435\u0442\u0435 \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0442\u0435\u043A\u0441\u0442 **\u0436\u0438\u0440\u043D\u044B\u043C**.\n\u0418\u043B\u0438 _\u043A\u0443\u0440\u0441\u0438\u0432\u043D\u044B\u043C_.\n\u0418\u043B\u0438... **_\u0442\u0435\u043C \u0438 \u0434\u0440\u0443\u0433\u0438\u043C_**\n\u041C\u043E\u0436\u043D\u043E \u0442\u0430\u043A\u0436\u0435 ~~\u0437\u0430\u0447\u0435\u0440\u043A\u0438\u0432\u0430\u0442\u044C \u0442\u0435\u043A\u0441\u0442~~.\n\n\u0415\u0441\u0442\u044C \u0442\u0430\u043A\u0436\u0435 [\u0441\u0441\u044B\u043B\u043A\u0438](https://www.freecodecamp.com), \u0438\n> \u0426\u0438\u0442\u0430\u0442\u044B\n\n\u0415\u0441\u0442\u044C \u0442\u0430\u0431\u043B\u0438\u0446\u044B:\n\n\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A / \u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A / \u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A\n------------ | ------------- | ------------- \n\u0412\u0430\u0448 \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u043C\u043E\u0436\u0435\u0442 | \u0431\u044B\u0442\u044C \u0437\u0434\u0435\u0441\u044C, |\u0438 \u0437\u0434\u0435\u0441\u044C....\n\u0418 \u0437\u0434\u0435\u0441\u044C. | \u041E\u043A\u0435\u0439. - \u042F \u0434\u0443\u043C\u0430\u044E, |\u043F\u043E\u043D\u044F\u0442\u043D\u043E.\n\n- \u0418 \u043A\u043E\u043D\u0435\u0447\u043D\u043E \u0436\u0435 \u0435\u0441\u0442\u044C \u0441\u043F\u0438\u0441\u043A\u0438.\n  - \u041D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u0430\u0440\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u044B.\n     - \u0421 \u0440\u0430\u0437\u043B\u0438\u0447\u043D\u044B\u043C\u0438 \u0443\u0440\u043E\u0432\u043D\u044F\u043C\u0438 \u043E\u0442\u0441\u0442\u0443\u043F\u0430.\n        - \u042D\u0442\u043E \u0432\u044B\u0433\u043B\u044F\u0434\u0438\u0442 \u0432\u043E\u0442 \u0442\u0430\u043A.\n\n\n1. \u0415\u0441\u0442\u044C \u043D\u0443\u043C\u0435\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0441\u043F\u0438\u0441\u043A\u0438.\n1. \u041F\u043E\u0440\u044F\u0434\u043E\u043A \u043D\u0443\u043C\u0435\u0440\u0430\u0446\u0438\u0438 \u043D\u0435 \u0432\u0430\u0436\u0435\u043D\n1. \u041F\u0440\u0438 \u043F\u0440\u0435\u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0438 \u0432\u0441\u0435 \u0431\u0443\u0434\u0435\u0442 \u0432\u044B\u0433\u043B\u044F\u0434\u0435\u0442\u044C \u043A\u0430\u043A \u043D\u0430\u0434\u043E\n- \u0414\u0430\u0436\u0435 \u0435\u0441\u043B\u0438 \u0432\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0435 \u0442\u0438\u0440\u0435 \n* \u0438\u043B\u0438 \u0437\u0432\u0435\u0437\u0434\u043E\u0447\u043A\u0438.\n\n\u0410 \u0432\u043E\u0442 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435:\n\n![React Logo w/ Tex](https://goo.gl/Umyytc)\n";

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));