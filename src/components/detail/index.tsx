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
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} md={10} lg={8}>
            {dataSource && dataSource.markdown ? (
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
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Detail;
