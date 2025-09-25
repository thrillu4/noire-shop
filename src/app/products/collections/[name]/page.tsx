import ProductsGenderPage from '@/components/Products/ProductsGenderPage'

const Collection = async ({
  params,
}: {
  params: Promise<{ name: string }>
}) => {
  const { name } = await params
  return <ProductsGenderPage gender="all" name={name} />
}

export default Collection
