'use client'
import Link from 'next/link';
import React from 'react';

const SchoolShiftCreate = () => {
	return (
		<div class="container-fluid">
			<div class="row">
				<div className='col-12 p-4'>
					<div className='card'>
						<div class=" body-content bg-light">
							<div class=" border-primary shadow-sm border-0">
								<div class="card-header py-1  custom-card-header clearfix bg-gradient-primary text-white">
									<h5 class="card-title font-weight-bold mb-0 card-header-color float-left mt-1">Create School Shift</h5>
									<div class="card-title font-weight-bold mb-0 card-header-color float-right">
										<Link href={`/Admin/school_shiftt/school_shiftt_all?page_group`} class="btn btn-sm btn-info">Back School Shift List</Link></div>
								</div>
								<div class="alert alert-warning mb-0 mx-4 mt-4 text-danger font-weight-bold" role="alert">
									(<small><sup><i class="text-danger fas fa-star"></i></sup></small>) field required
								</div>
								<form action="">

									<div class="card-body">


										<div class="card-body">
											<form class="" method="post" autocomplete="off">
												<div class="form-group row">
													<label class="col-form-label font-weight-bold col-md-3">Name:<small><sup><small><i class="text-danger fas fa-star"></i></small></sup></small></label>
													<div class="col-md-6">
														<input type="text" required="" name="name" class="form-control form-control-sm  required alpha_space unique_name" id="name" placeholder="Enter Name" value="" />
													</div>
												</div>
												<div class="form-group row">
													<label class="col-form-label font-weight-bold col-md-3">Start Time:<small><sup><small><i class="text-danger fas fa-star"></i></small></sup></small></label>
													<div class="col-md-6">
														<input type="text" required="" name="shift_start_time" class="form-control form-control-sm  urban_timepicker required" id="shift_start_time" placeholder="Enter Shift Start Time" value="" />
													</div>
												</div>
												<div class="form-group row">
													<label class="col-form-label font-weight-bold col-md-3">Late Time:<small><sup><small><i class="text-danger fas fa-star"></i></small></sup></small></label>
													<div class="col-md-6">
														<input type="text" required="" name="shift_late_time" class="form-control form-control-sm  urban_timepicker required" id="shift_late_time" placeholder="Enter Shift Late Time" value="" />
													</div>
												</div>
												<div class="form-group row">
													<label class="col-form-label font-weight-bold col-md-3">End Time:<small><sup><small><i class="text-danger fas fa-star"></i></small></sup></small></label>
													<div class="col-md-6">
														<input type="text" required="" name="shift_end_time" class="form-control form-control-sm  urban_timepicker required" id="shift_end_time" placeholder="Enter Shift End Time" value="" />
													</div>
												</div>
												<div class="form-group row">
													<label class="col-form-label font-weight-bold col-md-3">Early End Time:<small><sup><small><i class="text-danger fas fa-star"></i></small></sup></small></label>
													<div class="col-md-6">
														<input type="text" required="" name="shift_end_time" class="form-control form-control-sm  urban_timepicker required" id="shift_end_time" placeholder="Enter Shift End Time" value="" />
													</div>
												</div>

												<div class="form-group row">
													<div class="offset-md-3 col-sm-6">
														<input type="submit" name="create" class="btn btn-sm btn-success" value="Submit" />
													</div>
												</div>
											</form>
										</div>

									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SchoolShiftCreate;