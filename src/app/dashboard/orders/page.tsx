'use client';
import { Cancel, CheckCircle, Receipt, Timer } from '@mui/icons-material';
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Pagination } from '@mui/material';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';

import { getAllDocument } from '@/utils/firebase';

const color = {
  pending: 'rgba(0, 0, 0, 0.26)',
  cancelled: '#f44336',
  done: '#66bb6a',
};

const LIMIT = 10;

export default function Orders() {
  const [orders, setOrders] = useState<TransactionType[]>([]);
  const [pagination, setPagination] = useState({ page: 1, direction: 1 });
  const [cursor, setCursor] = useState<{
    after?: QueryDocumentSnapshot<DocumentData, DocumentData>;
    before?: QueryDocumentSnapshot<DocumentData, DocumentData>;
  }>();
  const [totalPage, setTotalPage] = useState(0);

  const getOrders = useCallback(
    (page: number, limit: number) => {
      getAllDocument(
        'transactions',
        limit,
        { after: page === 1 ? cursor?.after : undefined, before: page === -1 ? cursor?.before : undefined },
        { value: 'date', order: 'desc' }
      ).then((res) => {
        if (res.result) {
          setOrders(
            res.result.docs.map(
              (doc) =>
                ({
                  id: doc.id,
                  ...doc.data(),
                  date: new Date((doc.data().date as FirebaseDate).seconds * 1000),
                }) as TransactionType
            )
            // .sort(function (a, b) {
            //   return (b.date as Date).getTime() - (a.date as Date).getTime();
            // })
          );
          setCursor({ after: res.result.docs[LIMIT - 1], before: res.result.docs[0] });
        }
        if (res.totalDoc) setTotalPage(Math.ceil(res.totalDoc / LIMIT));
      });
    },
    [cursor]
  );

  useEffect(() => {
    getOrders(pagination.direction, LIMIT);
  }, [pagination]);

  return (
    <div className="flex-1 bg-white h-full overflow-y-auto p-5">
      <h1 className="font-black text-gray-800 text-2xl">Toutes les commandes</h1>
      <Divider className="m-3" />
      <List>
        {orders.map((order) => (
          <ListItem
            key={order.id}
            secondaryAction={
              <IconButton edge="end" aria-label="facture" href={order.pdf || ''} disabled={!!!order.pdf} target="_blank">
                <Receipt />
              </IconButton>
            }>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: color[order.status] }}>
                {order.status === 'pending' ? <Timer /> : order.status === 'done' ? <CheckCircle /> : <Cancel />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={order.userInfo?.email || order.id}
              secondary={`${(order.date as Date).toISOString().substr(0, 19)} - ${order.status}`}
              className="truncate"
              primaryTypographyProps={{ color: color[order.status] }}
            />
          </ListItem>
        ))}
      </List>
      <Pagination
        count={totalPage}
        color="primary"
        onChange={(e, p) => setPagination((prev) => ({ page: p, direction: p > prev.page ? 1 : -1 }))}
      />
    </div>
  );
}
