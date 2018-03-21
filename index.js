const Collapse = ({ height, isCollapsed, innerRef, ...props }) => {
  return (
    <div
      ref={innerRef}
      style={{
        height: isCollapsed ? 0 : height,
        overflow: isCollapsed ? 'hidden' : null,
        transition: 'height 260ms cubic-bezier(0.2, 0, 0, 1)',
      }}
      {...props}
    />
  );
};

export default class Toggle extends Component {
  static defaultProps = {
    beforeCollapse: () => null,
    afterCollapse: () => null,
  }

  state = {
    isCollapsed: true,
    contentHeight: 0,
  }

  componentWillReceiveProps({ location }: HeaderProps) {
    if (this.state.isCollapsed) {
      this.toggleCollapse();
    }
  }

  getContent = ref => {
    if (!ref) return;
    this.content = ref;
  };

  toggleCollapse = () => {
    const contentHeight = this.content.scrollHeight;
    this.setState({ contentHeight, isCollapsed: !this.state.isCollapsed });
  };

  render() {
    let { type, beforeCollapse, afterCollapse } = this.props
    let { isCollapsed, contentHeight } = this.state

    return (
      <div>
        {beforeCollapse(isCollapsed, this.toggleCollapse)}
        <Collapse
          isCollapsed={isCollapsed}
          duration={500}
          height={contentHeight}
          innerRef={this.getContent}
        >
          {this.props.children}
        </Collapse>
        {afterCollapse(isCollapsed, this.toggleCollapse)}
      </div>
    );
  }
}
