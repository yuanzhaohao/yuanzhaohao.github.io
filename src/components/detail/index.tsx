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
};

class Detail extends React.PureComponent<DetailProps, DetailState> {
  constructor(props: DetailProps) {
    super(props);
    this.state = {
      dataSource: null,
    };
  }
  public async componentDidMount() {
    const { params } = this.props.match;
    if (params && params.name) {
      const dataSource = await import(`../../../markdown/${params.name}.md`);
      console.log(params.name, dataSource);
      this.setState({
        dataSource,
      });
    }
  }

  public render() {
    const { dataSource } = this.state;

    return (
      <div className="detail-container">
        {dataSource && dataSource.markdown ? (
          <div
            className="app-page-info"
            dangerouslySetInnerHTML={{
              __html: dataSource.markdown,
            }}
          />
        ) : (
          <div className="page-loading">
            <Spin text="Loading..." spinning={true} />
          </div>
        )}
      </div>
    );
  }
}

export default Detail;
