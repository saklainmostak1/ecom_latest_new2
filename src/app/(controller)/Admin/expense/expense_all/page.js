import ExpenseList from '@/app/(view)/admin/expense/expense_all/page';
import React from 'react';

const ExpenseAll = ({searchParams}) => {
    return (
        <div>
            <ExpenseList
            searchParams={searchParams}
            ></ExpenseList>
        </div>
    );
};

export default ExpenseAll;