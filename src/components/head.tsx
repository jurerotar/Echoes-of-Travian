import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

type PublicPageName = 'index';

type GamePageName = 'resources' | 'village' | 'map';

type ViewName = PublicPageName | GamePageName;

const viewNameToMetaMap = new Map<ViewName, string>([
  ['index', 'APP.PUBLIC.INDEX.META'],
  ['resources', 'APP.GAME.RESOURCES.META'],
  ['village', 'APP.GAME.VILLAGE.META'],
  ['map', 'APP.GAME.MAP.META'],
]);

type AppHelmetProps = {
  viewName: ViewName;
  tFunctionArgs?: Record<string, unknown>;
  children?: React.ReactNode;
};

export const Head: React.FC<AppHelmetProps> = (props) => {
  const { viewName, tFunctionArgs, children } = props;

  const { t } = useTranslation();

  const meta = viewNameToMetaMap.get(viewName);

  const title = t(`${meta}.TITLE`, { ...tFunctionArgs });
  const description = t(`${meta}.DESCRIPTION`, { ...tFunctionArgs });

  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="description"
        content={description}
      />
      <meta
        name="twitter:title"
        content={title}
      />
      <meta
        name="twitter:description"
        content={description}
      />
      <meta
        property="og:title"
        content={title}
      />
      <meta
        property="og:description"
        content={description}
      />
      {children}
    </Helmet>
  );
};
