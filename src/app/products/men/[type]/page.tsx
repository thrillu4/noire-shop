import ProductsGenderPage from '@/components/Products/ProductsGenderPage'

const Types = async ({ params }: { params: Promise<{ type: string }> }) => {
  const { type } = await params
  return <ProductsGenderPage gender="male" type={type} />
}

export default Types
