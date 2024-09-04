import UndefinedIcon from '@/assets/undefined-icon.png'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { startProgress } from '@/stores/progressStore'
import quizStore, { SortableField, downloadQuiz, removeQuiz, toggleFavorite, toggleSort, updateQuiz } from '@/stores/quizStore'
import { ArrowDown, ArrowUp, Braces, CodeXml, Heart, MoreHorizontal, Pencil, Play, Save, Trash, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSnapshot } from 'valtio'

export function QuizTable (): JSX.Element {
  const { t } = useTranslation()

  /**********************************************
   * Sorting logic
   **********************************************/

  const { list, sortState } = useSnapshot(quizStore)

  const sortedList = useMemo(
    () => sortState === undefined
      ? list
      : [...list].sort((a, b) =>
          sortState.field === 'questions'
            ? sortState.order === 'asc'
              ? a.questions.length - b.questions.length
              : b.questions.length - a.questions.length
            : sortState.order === 'asc'
              ? a[sortState.field].localeCompare(b[sortState.field])
              : b[sortState.field].localeCompare(a[sortState.field])
        ),
    [list, sortState]
  )

  const Arrow = ({ field }: { field: SortableField }): JSX.Element => {
    if (sortState?.field === field) {
      switch (sortState.order) {
        case 'asc':
          return <ArrowDown className='h-4 w-4' />

        case 'desc':
          return <ArrowUp className='h-4 w-4' />
      }
    }

    return <></>
  }

  /**********************************************
   * Edit logic
   **********************************************/

  const [editState, setEditState] = useState<{
    id: string
    category: string
    name: string
  }>()

  const saveEditState = (): void => {
    if (editState !== undefined) {
      updateQuiz(editState.id, editState.category, editState.name)
      setEditState(undefined)
    }
  }

  const cancelEditState = (): void => {
    if (editState !== undefined) {
      setEditState(undefined)
    }
  }

  const handleKeyDown = (key: string): void => {
    switch (key) {
      case 'Enter':
        saveEditState()
        break

      case 'Escape':
        cancelEditState()
        break
    }
  }

  /**********************************************
   * Remove logic
   **********************************************/

  const [removingQuizId, setRemovingQuizId] = useState<string>()
  const removingQuizName = useMemo(
    () => sortedList.find(({ id }) => id === removingQuizId)?.name, [removingQuizId]
  )

  const open = removingQuizId !== undefined

  const handleRemove = (): void => {
    if (removingQuizId !== undefined) {
      removeQuiz(removingQuizId)
      setRemovingQuizId(undefined)
    }
  }

  const handleCancel = (): void => {
    setRemovingQuizId(undefined)
  }

  /**********************************************
   * Context menu actions
   **********************************************/

  const handlePlay = (id: string) => (): void => {
    startProgress(id)
    openSidePanel().catch(console.error)
  }

  return (
    <>
      <Card className='rounded-sm'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead />
              <TableHead
                className='cursor-pointer py-0 px-1'
                onClick={() => toggleSort('category')}
              >
                <div className='flex items-center'>
                  <span className='text-xs font-bold mr-1'>
                    {t('category')}
                  </span>
                  <Arrow field='category' />
                </div>
              </TableHead>
              <TableHead
                className='cursor-pointer py-0 px-1'
                onClick={() => toggleSort('name')}
              >
                <div className='flex items-center'>
                  <span className='text-xs font-bold mr-1'>{t('name')}</span>
                  <Arrow field='name' />
                </div>
              </TableHead>
              <TableHead
                className='cursor-pointer py-0 px-1'
                onClick={() => toggleSort('questions')}
              >
                <div className='flex items-center'>
                  <span className='text-xs font-bold mr-1'>#</span>
                  <Arrow field='questions' />
                </div>
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedList.map((quiz) => (
              <TableRow key={quiz.id} className='h-8'>
                <TableCell className='py-0 px-1'>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-6 w-6 p-0'
                    onClick={() => toggleFavorite(quiz.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        quiz.favorite === true
                          ? 'fill-red-500 text-red-500'
                          : ''
                      }`}
                    />
                  </Button>
                </TableCell>
                <TableCell className='py-0 px-1'>
                  <img
                    src={quiz.icon ?? UndefinedIcon}
                    alt={quiz.owner}
                    title={quiz.owner}
                    className='w-5 h-5 object-contain bg-white rounded-sm'
                  />
                </TableCell>
                <TableCell className='py-0 px-1 w-[220px] max-w-[220px]'>
                  {editState?.id === quiz.id
                    ? (
                      <Input
                        value={editState.category}
                        onChange={({ target: { value } }) =>
                          setEditState({ ...editState, category: value })}
                        onKeyDown={({ key }) => handleKeyDown(key)}
                        className='h-6 text-xs'
                      />
                      )
                    : (
                      <span
                        className='text-xs block truncate'
                        onDoubleClick={() =>
                          setEditState({
                            id: quiz.id,
                            category: quiz.category,
                            name: quiz.name
                          })}
                      >
                        {quiz.category}
                      </span>
                      )}
                </TableCell>
                <TableCell className='py-0 px-1 w-[220px] max-w-[220px]'>
                  {editState?.id === quiz.id
                    ? (
                      <Input
                        value={editState.name}
                        onChange={({ target: { value } }) =>
                          setEditState({ ...editState, name: value })}
                        onKeyDown={({ key }) => handleKeyDown(key)}
                        className='h-6 text-xs'
                      />
                      )
                    : (
                      <span
                        className='text-xs block truncate'
                        onDoubleClick={() =>
                          setEditState({
                            id: quiz.id,
                            category: quiz.category,
                            name: quiz.name
                          })}
                      >
                        {quiz.name}
                      </span>
                      )}
                </TableCell>
                <TableCell className='py-0 px-1 w-[40px] max-w-[40px]'>
                  <span className='text-xs'>{quiz.questions.length}</span>
                </TableCell>
                <TableCell className='py-0 px-1'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-6 w-6 p-0'
                      >
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      {editState?.id === quiz.id
                        ? (
                          <>
                            <DropdownMenuItem onClick={saveEditState}>
                              <Save className='mr-2 h-4 w-4' />
                              <span className='text-xs'>{t('save')}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={cancelEditState}>
                              <X className='mr-2 h-4 w-4' />
                              <span className='text-xs'>{t('cancel')}</span>
                            </DropdownMenuItem>
                          </>
                          )
                        : (
                          <>
                            <DropdownMenuItem
                              onClick={() =>
                                setEditState({
                                  id: quiz.id,
                                  category: quiz.category,
                                  name: quiz.name
                                })}
                            >
                              <Pencil className='mr-2 h-4 w-4' />
                              <span className='text-xs'>{t('edit')}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setRemovingQuizId(quiz.id)}
                            >
                              <Trash className='mr-2 h-4 w-4' />
                              <span className='text-xs'>{t('remove')}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => downloadQuiz(quiz.id)}
                            >
                              <Braces className='mr-2 h-4 w-4' />
                              <span className='text-xs'>JSON</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => console.log('download as HTML')}
                            >
                              <CodeXml className='mr-2 h-4 w-4' />
                              <span className='text-xs'>HTML</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handlePlay(quiz.id)}>
                              <Play className='mr-2 h-4 w-4' />
                              <span className='text-xs'>{t('play')}</span>
                            </DropdownMenuItem>
                          </>
                          )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <ConfirmDialog
        open={open}
        onCancel={handleCancel}
        onAccept={handleRemove}
        title={t('remove')}
        description={t('remove-quiz-message', { name: removingQuizName })}
        variant='alert'
      />
    </>
  )
}
