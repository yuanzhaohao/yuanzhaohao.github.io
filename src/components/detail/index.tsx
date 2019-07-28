import React, { useEffect, useState } from 'react';
import { Spin } from 'dashkit-ui';
import { match } from 'react-router-dom';
import './style.scss';

type DetailProps = {
  match: match<{ name?: string }>;
};
type DataSourceType = {
  markdown: string;
} | null;

function useRef() {
  const [element, setRef] = useState(null);

  useEffect(() => {
    if (element) {
      const codeElements = element.querySelectorAll('pre code');
      if (codeElements && codeElements.length > 0) {
        codeElements.forEach(codeElement => {
          (window as any).Prism.highlightElement(codeElement);
        });
      }
    }
  }, [element]);
  return [setRef];
}

function useFetch(name): [DataSourceType, boolean] {
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState<DataSourceType>(null);

  async function loadData() {
    setIsLoading(true);
    const dataSource = await import(`../../../markdown/${name}.md`);
    setIsLoading(false);
    setDataSource(dataSource);
  }

  useEffect(() => {
    loadData();
  }, [name]);

  return [dataSource, isLoading];
}

const Detail = (props: DetailProps) => {
  const { params } = props.match;
  const [ref] = useRef();
  const [dataSource, isLoading] = useFetch(params.name);

  return !isLoading && dataSource && dataSource.markdown ? (
    <div
      className="detail-container"
      ref={ref}
      dangerouslySetInnerHTML={{
        __html: dataSource.markdown,
      }}
    />
  ) : (
    <div className="page-loading">
      <Spin text="Loading..." spinning={true} />
    </div>
  );
};

export default Detail;
