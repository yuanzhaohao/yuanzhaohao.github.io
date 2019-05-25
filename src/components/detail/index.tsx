import * as React from 'react';
import { Spin, Grid } from 'dashkit-ui';
import { RouteComponentProps, match } from 'react-router-dom';
import './style.scss';

const { Row, Col } = Grid;

type DetailProps = RouteComponentProps & {
  match: match<{ name?: string }>;
};
type DetailState = {
  dataSource?: {
    markdown: string;
  } | null;
  isLoading: boolean;
};

class Detail extends React.PureComponent<DetailProps, DetailState> {
  constructor(props: DetailProps) {
    super(props);
    this.state = {
      dataSource: null,
      isLoading: false,
    };
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
    this.setState({
      dataSource,
      isLoading: false,
    });
  };
}

export default Detail;
