import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { withLayout } from '../../layout/Layout';
import { MenuItem } from '../../interfaces/menu.interface';
import { PageModel, TopLevelCategory } from '../../interfaces/page.interface'
import { ParsedUrlQuery } from 'querystring';
import { ProductModel } from '../../interfaces/product.interface';
import axios from 'axios';
import { firstLevelMenu } from '../../helpers'

function Course ({ menu, page, products }: CourseProps) {
  return (
    <>
      {products && products.length}
    </>
  );
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (const m of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
      firstCategory: m.id
    });
    paths = paths.concat(menu.flatMap(el => el.pages.map(page => `/${m.route}/${page.alias}`)));
  }
  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if(!params) {
    return {
      notFound: true
    };
  }
  const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type);
  if(!firstCategoryItem) {
    return {
      notFound: true
    };
  }
  try {
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
      firstCategory: firstCategoryItem?.id
    });
    const { data: page } = await axios.get<PageModel>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);
    const { data: products } = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find', {
      category: page.category,
      limit: 10
    });
    return {
      props: {
        menu,
        firstCategory: firstCategoryItem?.id,
        page,
        products
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

interface CourseProps extends Record<string, unknown>{
  menu: MenuItem[],
  firstCategory: TopLevelCategory,
  page: PageModel,
  products: ProductModel[]
}
