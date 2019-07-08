import * as React from 'react';
import { Spin } from 'dashkit-ui';
import { RouteComponentProps, match } from 'react-router-dom';
import './style.scss';

type DetailProps = RouteComponentProps & {
  match: match<{ name?: string }>;
};
type DetailState = {
  dataSource?: {
    markdown: string;
  } | null;
  isLoading: boolean;
};

class Detail extends React.Component<DetailProps, DetailState> {
  public readonly rootElement: React.RefObject<HTMLDivElement>;
  constructor(props: DetailProps) {
    super(props);
    this.rootElement = React.createRef();
    this.state = {
      dataSource: null,
      isLoading: false,
    };
  }
  public shouldComponentUpdate(nextProps: DetailProps, nextState: DetailState) {
    const { params } = this.props.match;
    const { params: nextParams } = nextProps.match;
    if (nextParams.name !== params.name || nextState.dataSource !== this.state.dataSource) {
      return true;
    }
    return false;
  }
  public componentDidUpdate(prevProps: DetailProps) {
    const { params } = this.props.match;
    const { params: prevParams } = prevProps.match;

    if (params.name && prevParams.name !== params.name) {
      this.loadData(params.name);
    }
  }

  public componentDidMount() {
    const { params } = this.props.match;
    if (params && params.name) {
      this.loadData(params.name);
    }
  }

  public render() {
    const { dataSource, isLoading } = this.state;

    return !isLoading && dataSource && dataSource.markdown ? (
      <div
        className="detail-container"
        ref={this.rootElement}
        dangerouslySetInnerHTML={{
          __html: dataSource.markdown,
        }}
      />
    ) : (
      <div className="page-loading">
        <Spin text="Loading..." spinning={true} />
      </div>
    );
  }

  private loadData = async (name: string) => {
    this.setState({
      isLoading: true,
    });
    const dataSource = await import(`../../../markdown/${name}.md`);
    this.setState(
      {
        dataSource,
        isLoading: false,
      },
      () => {
        if (this.rootElement && this.rootElement.current) {
          const rootElement = this.rootElement.current;
          const codeElements = rootElement.querySelectorAll('pre code');
          if (codeElements && codeElements.length > 0) {
            codeElements.forEach(codeElement => {
              (window as any).Prism.highlightElement(codeElement);
            });
          }
        }
      },
    );
  };
}

export default Detail;
