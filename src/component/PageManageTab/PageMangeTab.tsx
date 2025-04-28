export default function PageManageTab({
  pageInfo,
}: {
  pageInfo: { page: number; chapter: string | undefined }
}) {
  return (
    <>
      <div className="bg-gray-100 w-screen p-2">
        <div className="h-58 w-screen">
          <p>
            current page: {pageInfo.page}, chapter: {pageInfo.chapter}
          </p>
        </div>
      </div>
    </>
  )
}
