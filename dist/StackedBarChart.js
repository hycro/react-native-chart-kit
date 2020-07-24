var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
import React from "react";
import { View } from "react-native";
import { G, Rect, Svg, Text } from "react-native-svg";
import AbstractChart from "./AbstractChart";
var barWidth = 32;
var StackedBarChart = /** @class */ (function(_super) {
  __extends(StackedBarChart, _super);
  function StackedBarChart() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.getBarPercentage = function() {
      var _a = _this.props.chartConfig.barPercentage,
        barPercentage = _a === void 0 ? 1 : _a;
      return barPercentage;
    };
    _this.getBarRadius = function(ret, x) {
      return _this.props.chartConfig.barRadius && ret.length === x.length - 1
        ? _this.props.chartConfig.barRadius
        : 0;
    };
    _this.renderBars = function(_a) {
      var data = _a.data,
        width = _a.width,
        height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight,
        border = _a.border,
        colors = _a.colors,
        _b = _a.stackedBar,
        stackedBar = _b === void 0 ? false : _b;
      return data.map(function(x, i) {
        var barWidth = 32 * _this.getBarPercentage();
        var ret = [];
        var h = 0;
        var st = paddingTop;
        var fac = 1;
        if (stackedBar) {
          fac = 0.7;
        }
        for (var z = 0; z < x.length; z++) {
          h = (height - 55) * (x[z] / border);
          var y = (height / 4) * 3 - h + st;
          var xC =
            (paddingRight +
              (i * (width - paddingRight)) / data.length +
              barWidth / 2) *
            fac;
          ret.push(
            <Rect
              key={Math.random()}
              x={xC}
              y={y}
              rx={_this.getBarRadius(ret, x)}
              ry={_this.getBarRadius(ret, x)}
              width={barWidth}
              height={h}
              fill={colors[z]}
            />
          );
          if (!_this.props.hideLegend) {
            ret.push(
              <Text
                key={Math.random()}
                x={xC + 7 + barWidth / 2}
                textAnchor="end"
                y={h > 15 ? y + 15 : y + 7}
                {..._this.getPropsForLabels()}
              >
                {x[z]}
              </Text>
            );
          }
          st -= h;
        }
        return ret;
      });
    };
    _this.renderLegend = function(_a) {
      var legend = _a.legend,
        colors = _a.colors,
        width = _a.width,
        height = _a.height;
      return legend.map(function(x, i) {
        return (
          <G key={Math.random()}>
            <Rect
              width="16px"
              height="16px"
              fill={colors[i]}
              rx={8}
              ry={8}
              x={width * 0.71}
              y={height * 0.7 - i * 50}
            />
            <Text
              x={width * 0.78}
              y={height * 0.76 - i * 50}
              {..._this.getPropsForLabels()}
            >
              {x}
            </Text>
          </G>
        );
      });
    };
    return _this;
  }
  StackedBarChart.prototype.render = function() {
    var paddingTop = 15;
    var paddingRight = 50;
    var _a = this.props,
      width = _a.width,
      height = _a.height,
      _b = _a.style,
      style = _b === void 0 ? {} : _b,
      data = _a.data,
      _c = _a.withHorizontalLabels,
      withHorizontalLabels = _c === void 0 ? true : _c,
      _d = _a.withVerticalLabels,
      withVerticalLabels = _d === void 0 ? true : _d,
      _e = _a.segments,
      segments = _e === void 0 ? 4 : _e,
      decimalPlaces = _a.decimalPlaces;
    var _f = style.borderRadius,
      borderRadius = _f === void 0 ? 0 : _f;
    var config = {
      width: width,
      height: height
    };
    var border = 0;
    for (var i = 0; i < data.data.length; i++) {
      var actual = data.data[i].reduce(function(pv, cv) {
        return pv + cv;
      }, 0);
      if (actual > border) {
        border = actual;
      }
    }
    var stackedBar = data.legend && data.legend.length == 0 ? false : true;
    return (
      <View style={style}>
        <Svg height={height} width={width}>
          {this.renderDefs(
            __assign(__assign({}, config), this.props.chartConfig)
          )}
          <Rect
            width="100%"
            height={height}
            rx={borderRadius}
            ry={borderRadius}
            fill="url(#backgroundGradient)"
          />
          <G>
            {this.renderHorizontalLines(
              __assign(__assign({}, config), {
                count: segments,
                paddingTop: paddingTop
              })
            )}
          </G>
          <G>
            {withHorizontalLabels
              ? this.renderHorizontalLabels(
                  __assign(__assign({}, config), {
                    count: segments,
                    data: [0, border],
                    paddingTop: paddingTop,
                    paddingRight: paddingRight,
                    decimalPlaces: decimalPlaces
                  })
                )
              : null}
          </G>
          <G>
            {withVerticalLabels
              ? this.renderVerticalLabels(
                  __assign(__assign({}, config), {
                    labels: data.labels,
                    paddingRight: paddingRight + 28,
                    stackedBar: stackedBar,
                    paddingTop: paddingTop,
                    horizontalOffset: barWidth
                  })
                )
              : null}
          </G>
          <G>
            {this.renderBars(
              __assign(__assign({}, config), {
                data: data.data,
                border: border,
                colors: this.props.data.barColors,
                paddingTop: paddingTop,
                paddingRight: paddingRight + 20,
                stackedBar: stackedBar
              })
            )}
          </G>
          {data.legend &&
            data.legend.length != 0 &&
            this.renderLegend(
              __assign(__assign({}, config), {
                legend: data.legend,
                colors: this.props.data.barColors
              })
            )}
        </Svg>
      </View>
    );
  };
  return StackedBarChart;
})(AbstractChart);
export default StackedBarChart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhY2tlZEJhckNoYXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1N0YWNrZWRCYXJDaGFydC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBRSxJQUFJLEVBQWEsTUFBTSxjQUFjLENBQUM7QUFDL0MsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXRELE9BQU8sYUFHTixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQTZDcEI7SUFBOEIsbUNBRzdCO0lBSEQ7UUFBQSxxRUF3TkM7UUFwTkMsc0JBQWdCLEdBQUc7WUFDVCxJQUFBLEtBQXNCLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxjQUEzQixFQUFqQixhQUFhLG1CQUFHLENBQUMsS0FBQSxDQUE0QjtZQUNyRCxPQUFPLGFBQWEsQ0FBQztRQUN2QixDQUFDLENBQUM7UUFFRixrQkFBWSxHQUFHLFVBQUMsR0FBbUIsRUFBRSxDQUFpQjtZQUNwRCxPQUFPLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDcEUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVM7Z0JBQ2xDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUM7UUFFRixnQkFBVSxHQUFHLFVBQUMsRUFnQmI7Z0JBZkMsSUFBSSxVQUFBLEVBQ0osS0FBSyxXQUFBLEVBQ0wsTUFBTSxZQUFBLEVBQ04sVUFBVSxnQkFBQSxFQUNWLFlBQVksa0JBQUEsRUFDWixNQUFNLFlBQUEsRUFDTixNQUFNLFlBQUEsRUFDTixrQkFBa0Is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Q0FBQyxDQUNIO1VBQUEsQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLFlBQVksdUJBQ1osTUFBTSxLQUNULE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUNqQyxDQUNOO1FBQUEsRUFBRSxHQUFHLENBQ1A7TUFBQSxFQUFFLElBQUksQ0FBQyxDQUNSLENBQUM7SUFDSixDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBeE5ELENBQThCLGFBQWEsR0F3TjFDO0FBRUQsZUFBZSxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBWaWV3LCBWaWV3U3R5bGUgfSBmcm9tIFwicmVhY3QtbmF0aXZlXCI7XG5pbXBvcnQgeyBHLCBSZWN0LCBTdmcsIFRleHQgfSBmcm9tIFwicmVhY3QtbmF0aXZlLXN2Z1wiO1xuXG5pbXBvcnQgQWJzdHJhY3RDaGFydCwge1xuICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxuICBBYnN0cmFjdENoYXJ0UHJvcHNcbn0gZnJvbSBcIi4vQWJzdHJhY3RDaGFydFwiO1xuXG5jb25zdCBiYXJXaWR0aCA9IDMyO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YWNrZWRCYXJDaGFydERhdGEge1xuICBsYWJlbHM6IHN0cmluZ1tdO1xuICBsZWdlbmQ6IHN0cmluZ1tdO1xuICBkYXRhOiBudW1iZXJbXVtdO1xuICBiYXJDb2xvcnM6IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0YWNrZWRCYXJDaGFydFByb3BzIGV4dGVuZHMgQWJzdHJhY3RDaGFydFByb3BzIHtcbiAgLyoqXG4gICAqIEUuZy5cbiAgICogYGBgamF2YXNjcmlwdFxuICAgKiBjb25zdCBkYXRhID0ge1xuICAgKiAgIGxhYmVsczogW1wiVGVzdDFcIiwgXCJUZXN0MlwiXSxcbiAgICogICBsZWdlbmQ6IFtcIkwxXCIsIFwiTDJcIiwgXCJMM1wiXSxcbiAgICogICBkYXRhOiBbWzYwLCA2MCwgNjBdLCBbMzAsIDMwLCA2MF1dLFxuICAgKiAgIGJhckNvbG9yczogW1wiI2RmZTRlYVwiLCBcIiNjZWQ2ZTBcIiwgXCIjYTRiMGJlXCJdXG4gICAqIH07XG4gICAqIGBgYFxuICAgKi9cbiAgZGF0YTogU3RhY2tlZEJhckNoYXJ0RGF0YTtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIGNoYXJ0Q29uZmlnOiBBYnN0cmFjdENoYXJ0Q29uZmlnO1xuICBoaWRlTGVnZW5kOiBib29sZWFuO1xuICBzdHlsZT86IFBhcnRpYWw8Vmlld1N0eWxlPjtcbiAgYmFyUGVyY2VudGFnZT86IG51bWJlcjtcbiAgZGVjaW1hbFBsYWNlcz86IG51bWJlcjtcbiAgLyoqXG4gICAqIFNob3cgdmVydGljYWwgbGFiZWxzIC0gZGVmYXVsdDogVHJ1ZS5cbiAgICovXG4gIHdpdGhWZXJ0aWNhbExhYmVscz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBTaG93IGhvcml6b250YWwgbGFiZWxzIC0gZGVmYXVsdDogVHJ1ZS5cbiAgICovXG4gIHdpdGhIb3Jpem9udGFsTGFiZWxzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgaG9yaXpvbnRhbCBsaW5lc1xuICAgKi9cbiAgc2VnbWVudHM/OiBudW1iZXI7XG59XG5cbnR5cGUgU3RhY2tlZEJhckNoYXJ0U3RhdGUgPSB7fTtcblxuY2xhc3MgU3RhY2tlZEJhckNoYXJ0IGV4dGVuZHMgQWJzdHJhY3RDaGFydDxcbiAgU3RhY2tlZEJhckNoYXJ0UHJvcHMsXG4gIFN0YWNrZWRCYXJDaGFydFN0YXRlXG4+IHtcbiAgZ2V0QmFyUGVyY2VudGFnZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGJhclBlcmNlbnRhZ2UgPSAxIH0gPSB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnO1xuICAgIHJldHVybiBiYXJQZXJjZW50YWdlO1xuICB9O1xuXG4gIGdldEJhclJhZGl1cyA9IChyZXQ6IHN0cmluZyB8IGFueVtdLCB4OiBzdHJpbmcgfCBhbnlbXSkgPT4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLmJhclJhZGl1cyAmJiByZXQubGVuZ3RoID09PSB4Lmxlbmd0aCAtIDFcbiAgICAgID8gdGhpcy5wcm9wcy5jaGFydENvbmZpZy5iYXJSYWRpdXNcbiAgICAgIDogMDtcbiAgfTtcblxuICByZW5kZXJCYXJzID0gKHtcbiAgICBkYXRhLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBwYWRkaW5nVG9wLFxuICAgIHBhZGRpbmdSaWdodCxcbiAgICBib3JkZXIsXG4gICAgY29sb3JzLFxuICAgIHN0YWNrZWRCYXIgPSBmYWxzZVxuICB9OiBQaWNrPFxuICAgIE9taXQ8QWJzdHJhY3RDaGFydENvbmZpZywgXCJkYXRhXCI+LFxuICAgIFwid2lkdGhcIiB8IFwiaGVpZ2h0XCIgfCBcInBhZGRpbmdSaWdodFwiIHwgXCJwYWRkaW5nVG9wXCIgfCBcInN0YWNrZWRCYXJcIlxuICA+ICYge1xuICAgIGJvcmRlcjogbnVtYmVyO1xuICAgIGNvbG9yczogc3RyaW5nW107XG4gICAgZGF0YTogbnVtYmVyW11bXTtcbiAgfSkgPT5cbiAgICBkYXRhLm1hcCgoeCwgaSkgPT4ge1xuICAgICAgY29uc3QgYmFyV2lkdGggPSAzMiAqIHRoaXMuZ2V0QmFyUGVyY2VudGFnZSgpO1xuICAgICAgY29uc3QgcmV0ID0gW107XG4gICAgICBsZXQgaCA9IDA7XG4gICAgICBsZXQgc3QgPSBwYWRkaW5nVG9wO1xuXG4gICAgICBsZXQgZmFjID0gMTtcbiAgICAgIGlmIChzdGFja2VkQmFyKSB7XG4gICAgICAgIGZhYyA9IDAuNztcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgeiA9IDA7IHogPCB4Lmxlbmd0aDsgeisrKSB7XG4gICAgICAgIGggPSAoaGVpZ2h0IC0gNTUpICogKHhbel0gLyBib3JkZXIpO1xuXG4gICAgICAgIGNvbnN0IHkgPSAoaGVpZ2h0IC8gNCkgKiAzIC0gaCArIHN0O1xuICAgICAgICBjb25zdCB4QyA9XG4gICAgICAgICAgKHBhZGRpbmdSaWdodCArXG4gICAgICAgICAgICAoaSAqICh3aWR0aCAtIHBhZGRpbmdSaWdodCkpIC8gZGF0YS5sZW5ndGggK1xuICAgICAgICAgICAgYmFyV2lkdGggLyAyKSAqXG4gICAgICAgICAgZmFjO1xuXG4gICAgICAgIHJldC5wdXNoKFxuICAgICAgICAgIDxSZWN0XG4gICAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XG4gICAgICAgICAgICB4PXt4Q31cbiAgICAgICAgICAgIHk9e3l9XG4gICAgICAgICAgICByeD17dGhpcy5nZXRCYXJSYWRpdXMocmV0LCB4KX1cbiAgICAgICAgICAgIHJ5PXt0aGlzLmdldEJhclJhZGl1cyhyZXQsIHgpfVxuICAgICAgICAgICAgd2lkdGg9e2JhcldpZHRofVxuICAgICAgICAgICAgaGVpZ2h0PXtofVxuICAgICAgICAgICAgZmlsbD17Y29sb3JzW3pdfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmhpZGVMZWdlbmQpIHtcbiAgICAgICAgICByZXQucHVzaChcbiAgICAgICAgICAgIDxUZXh0XG4gICAgICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cbiAgICAgICAgICAgICAgeD17eEMgKyA3ICsgYmFyV2lkdGggLyAyfVxuICAgICAgICAgICAgICB0ZXh0QW5jaG9yPVwiZW5kXCJcbiAgICAgICAgICAgICAgeT17aCA+IDE1ID8geSArIDE1IDogeSArIDd9XG4gICAgICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yTGFiZWxzKCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt4W3pdfVxuICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBzdCAtPSBoO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0pO1xuXG4gIHJlbmRlckxlZ2VuZCA9ICh7XG4gICAgbGVnZW5kLFxuICAgIGNvbG9ycyxcbiAgICB3aWR0aCxcbiAgICBoZWlnaHRcbiAgfTogUGljazxBYnN0cmFjdENoYXJ0Q29uZmlnLCBcIndpZHRoXCIgfCBcImhlaWdodFwiPiAmIHtcbiAgICBsZWdlbmQ6IHN0cmluZ1tdO1xuICAgIGNvbG9yczogc3RyaW5nW107XG4gIH0pID0+XG4gICAgbGVnZW5kLm1hcCgoeCwgaSkgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEcga2V5PXtNYXRoLnJhbmRvbSgpfT5cbiAgICAgICAgICA8UmVjdFxuICAgICAgICAgICAgd2lkdGg9XCIxNnB4XCJcbiAgICAgICAgICAgIGhlaWdodD1cIjE2cHhcIlxuICAgICAgICAgICAgZmlsbD17Y29sb3JzW2ldfVxuICAgICAgICAgICAgcng9ezh9XG4gICAgICAgICAgICByeT17OH1cbiAgICAgICAgICAgIHg9e3dpZHRoICogMC43MX1cbiAgICAgICAgICAgIHk9e2hlaWdodCAqIDAuNyAtIGkgKiA1MH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxUZXh0XG4gICAgICAgICAgICB4PXt3aWR0aCAqIDAuNzh9XG4gICAgICAgICAgICB5PXtoZWlnaHQgKiAwLjc2IC0gaSAqIDUwfVxuICAgICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JMYWJlbHMoKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eH1cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgIDwvRz5cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHBhZGRpbmdUb3AgPSAxNTtcbiAgICBjb25zdCBwYWRkaW5nUmlnaHQgPSA1MDtcblxuICAgIGNvbnN0IHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgc3R5bGUgPSB7fSxcbiAgICAgIGRhdGEsXG4gICAgICB3aXRoSG9yaXpvbnRhbExhYmVscyA9IHRydWUsXG4gICAgICB3aXRoVmVydGljYWxMYWJlbHMgPSB0cnVlLFxuICAgICAgc2VnbWVudHMgPSA0LFxuICAgICAgZGVjaW1hbFBsYWNlc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgeyBib3JkZXJSYWRpdXMgPSAwIH0gPSBzdHlsZTtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodFxuICAgIH07XG5cbiAgICBsZXQgYm9yZGVyID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYWN0dWFsID0gZGF0YS5kYXRhW2ldLnJlZHVjZSgocHYsIGN2KSA9PiBwdiArIGN2LCAwKTtcbiAgICAgIGlmIChhY3R1YWwgPiBib3JkZXIpIHtcbiAgICAgICAgYm9yZGVyID0gYWN0dWFsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBzdGFja2VkQmFyID0gZGF0YS5sZWdlbmQgJiYgZGF0YS5sZWdlbmQubGVuZ3RoID09IDAgPyBmYWxzZSA6IHRydWU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFZpZXcgc3R5bGU9e3N0eWxlfT5cbiAgICAgICAgPFN2ZyBoZWlnaHQ9e2hlaWdodH0gd2lkdGg9e3dpZHRofT5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJEZWZzKHtcbiAgICAgICAgICAgIC4uLmNvbmZpZyxcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuY2hhcnRDb25maWdcbiAgICAgICAgICB9KX1cbiAgICAgICAgICA8UmVjdFxuICAgICAgICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICAgICAgcng9e2JvcmRlclJhZGl1c31cbiAgICAgICAgICAgIHJ5PXtib3JkZXJSYWRpdXN9XG4gICAgICAgICAgICBmaWxsPVwidXJsKCNiYWNrZ3JvdW5kR3JhZGllbnQpXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxHPlxuICAgICAgICAgICAge3RoaXMucmVuZGVySG9yaXpvbnRhbExpbmVzKHtcbiAgICAgICAgICAgICAgLi4uY29uZmlnLFxuICAgICAgICAgICAgICBjb3VudDogc2VnbWVudHMsXG4gICAgICAgICAgICAgIHBhZGRpbmdUb3BcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvRz5cbiAgICAgICAgICA8Rz5cbiAgICAgICAgICAgIHt3aXRoSG9yaXpvbnRhbExhYmVsc1xuICAgICAgICAgICAgICA/IHRoaXMucmVuZGVySG9yaXpvbnRhbExhYmVscyh7XG4gICAgICAgICAgICAgICAgICAuLi5jb25maWcsXG4gICAgICAgICAgICAgICAgICBjb3VudDogc2VnbWVudHMsXG4gICAgICAgICAgICAgICAgICBkYXRhOiBbMCwgYm9yZGVyXSxcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3AsXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQsXG4gICAgICAgICAgICAgICAgICBkZWNpbWFsUGxhY2VzXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgOiBudWxsfVxuICAgICAgICAgIDwvRz5cbiAgICAgICAgICA8Rz5cbiAgICAgICAgICAgIHt3aXRoVmVydGljYWxMYWJlbHNcbiAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlclZlcnRpY2FsTGFiZWxzKHtcbiAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcbiAgICAgICAgICAgICAgICAgIGxhYmVsczogZGF0YS5sYWJlbHMsXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHBhZGRpbmdSaWdodCArIDI4LFxuICAgICAgICAgICAgICAgICAgc3RhY2tlZEJhcixcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3AsXG4gICAgICAgICAgICAgICAgICBob3Jpem9udGFsT2Zmc2V0OiBiYXJXaWR0aFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIDogbnVsbH1cbiAgICAgICAgICA8L0c+XG4gICAgICAgICAgPEc+XG4gICAgICAgICAgICB7dGhpcy5yZW5kZXJCYXJzKHtcbiAgICAgICAgICAgICAgLi4uY29uZmlnLFxuICAgICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgIGJvcmRlcixcbiAgICAgICAgICAgICAgY29sb3JzOiB0aGlzLnByb3BzLmRhdGEuYmFyQ29sb3JzLFxuICAgICAgICAgICAgICBwYWRkaW5nVG9wLFxuICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHBhZGRpbmdSaWdodCArIDIwLFxuICAgICAgICAgICAgICBzdGFja2VkQmFyXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L0c+XG4gICAgICAgICAge2RhdGEubGVnZW5kICYmXG4gICAgICAgICAgICBkYXRhLmxlZ2VuZC5sZW5ndGggIT0gMCAmJlxuICAgICAgICAgICAgdGhpcy5yZW5kZXJMZWdlbmQoe1xuICAgICAgICAgICAgICAuLi5jb25maWcsXG4gICAgICAgICAgICAgIGxlZ2VuZDogZGF0YS5sZWdlbmQsXG4gICAgICAgICAgICAgIGNvbG9yczogdGhpcy5wcm9wcy5kYXRhLmJhckNvbG9yc1xuICAgICAgICAgICAgfSl9XG4gICAgICAgIDwvU3ZnPlxuICAgICAgPC9WaWV3PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhY2tlZEJhckNoYXJ0O1xuIl19