import { Bookmark } from '@equinor/workspace-fusion';
import { useRef, useEffect } from 'react';
import {
  useCurrentBookmark,
  useBookmark,
} from '@equinor/fusion-framework-react-app/bookmark';

export function useWorkspaceBookmarks() {
  const bookmarkRef = useRef<Partial<Bookmark>>({});
  const bookmark = useCurrentBookmark<Bookmark>().currentBookmark;
  const id = bookmark?.id;
  const payload = bookmark?.payload;
  const bookmarkHandler = useBookmark<Partial<Bookmark>>();

  useEffect(() => {
    console.log('Registering handler');
    const unsub = bookmarkHandler.addBookmarkCreator(async () => {
      console.log('bookmark requested');
      return bookmarkRef.current;
    });

    return () => {
      typeof unsub === 'function' && unsub();
    };
  }, [bookmarkHandler]);

  const onBookmarkChange = (ref: Partial<Bookmark>) => {
    bookmarkRef.current = ref;
  };

  return {
    currentBookmark: payload,
    bookmarkKey: id,
    /** Add as prop to workspace */
    onBookmarkChange,
  };
}
