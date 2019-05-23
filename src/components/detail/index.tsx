import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

type DetailProps = RouteComponentProps;
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
    const dataSource = await import(`../../../markdown/ajax-usage.md`);
    console.log(dataSource);
  }

  public render() {
    return (
      <div className="detail-container">
        <h1>Detail</h1>
      </div>
    );
  }
}

export default Detail;
